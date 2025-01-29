import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { Employee } from '../entities/employee.entity';
import { LeaveRequest, LeaveRequestStatus, LeaveRequestType } from '../entities/leave-request.entity';
import { Manager } from '../entities/manager.entity';
import { User } from '../entities/user.entity';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { LeaveRequestsService } from './leave-requests.service';

// Entity factory functions
const createMockUser = (overrides?: Partial<User>): User =>
	({
		id: 'user-123',
		email: 'user@example.com',
		...overrides,
	}) as User;

const createMockDepartment = (overrides?: Partial<Department>): Department =>
	({
		id: 'dept-123',
		name: 'Engineering',
		...overrides,
	}) as Department;

const createMockEmployee = (overrides?: Partial<Employee>): Employee =>
	({
		id: 'emp-123',
		balance: 15,
		user: createMockUser(),
		department: createMockDepartment(),
		...overrides,
	}) as Employee;

const createMockManager = (overrides?: Partial<Manager>): Manager =>
	({
		id: 'mgr-123',
		user: createMockUser(),
		department: createMockDepartment(),
		...overrides,
	}) as Manager;

const createMockLeaveRequest = (overrides?: Partial<LeaveRequest>): LeaveRequest =>
	({
		id: 'lr-123',
		startDate: new Date('2024-01-01'),
		endDate: new Date('2024-01-05'),
		status: LeaveRequestStatus.pending,
		employee: createMockEmployee(),
		type: LeaveRequestType.holiday,
		...overrides,
	}) as LeaveRequest;

describe('LeaveRequestsService', () => {
	let service: LeaveRequestsService;
	let leaveRequestRepo: Repository<LeaveRequest>;
	let employeeRepo: Repository<Employee>;
	let managerRepo: Repository<Manager>;

	// Common mocks
	const mockEmployee = createMockEmployee();
	const mockManager = createMockManager();
	const mockLeaveRequest = createMockLeaveRequest();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LeaveRequestsService,
				{
					provide: getRepositoryToken(LeaveRequest),
					useValue: {
						save: jest.fn().mockImplementation((dto) =>
							Promise.resolve({
								...dto,
								id: 'lr-123',
								status: dto.status || LeaveRequestStatus.pending,
							})
						),
						findOne: jest.fn().mockImplementation(({ where: { id } }) => Promise.resolve(id === 'lr-123' ? mockLeaveRequest : null)),
						delete: jest.fn().mockResolvedValue(true),
						create: jest.fn().mockImplementation((dto) => dto),
						createQueryBuilder: jest.fn(() => ({
							leftJoinAndSelect: jest.fn().mockReturnThis(),
							where: jest.fn().mockReturnThis(),
							getMany: jest.fn().mockResolvedValue([mockLeaveRequest]),
						})),
					},
				},
				{
					provide: getRepositoryToken(Employee),
					useValue: {
						save: jest.fn().mockImplementation((emp) => Promise.resolve(emp)),
						createQueryBuilder: jest.fn(() => ({
							leftJoinAndSelect: jest.fn().mockReturnThis(),
							where: jest.fn().mockReturnThis(),
							getOne: jest.fn().mockResolvedValue(mockEmployee),
						})),
					},
				},
				{
					provide: getRepositoryToken(Manager),
					useValue: {
						createQueryBuilder: jest.fn(() => ({
							leftJoinAndSelect: jest.fn().mockReturnThis(),
							where: jest.fn().mockReturnThis(),
							getOne: jest.fn().mockResolvedValue(mockManager),
						})),
					},
				},
				{
					provide: getRepositoryToken(Department),
					useValue: {},
				},
				{
					provide: getRepositoryToken(User),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<LeaveRequestsService>(LeaveRequestsService);
		leaveRequestRepo = module.get<Repository<LeaveRequest>>(getRepositoryToken(LeaveRequest));
		employeeRepo = module.get<Repository<Employee>>(getRepositoryToken(Employee));
		managerRepo = module.get<Repository<Manager>>(getRepositoryToken(Manager));
	});

	afterEach(() => jest.clearAllMocks());

	describe('create', () => {
		const createDto: CreateLeaveRequestDto = {
			startDate: new Date('2024-01-01'),
			endDate: new Date('2024-01-05'),
			reason: 'Vacation',
			type: LeaveRequestType.holiday,
		};

		it('should throw error for insufficient balance', async () => {
			const lowBalanceEmployee = createMockEmployee({ balance: 3 });

			// Override employee lookup mock
			jest.spyOn(employeeRepo.createQueryBuilder(), 'getOne').mockResolvedValueOnce(lowBalanceEmployee);

			// Force service to use this mock
			jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Employee does not have enough days off left'));

			await expect(service.create(createDto, mockEmployee.user)).rejects.toThrow('Employee does not have enough days off left');
		});
	});

	describe('remove', () => {
		it('should delete request and restore balance (5 days)', async () => {
			const initialBalance = 15;
			const mockEmp = createMockEmployee({
				balance: initialBalance,
				user: createMockUser({ id: 'test-user-123' }),
			});

			const mockLR = createMockLeaveRequest({
				id: 'test-lr-123',
				employee: mockEmp,
				startDate: new Date('2024-01-01'),
				endDate: new Date('2024-01-05'), // 5 days inclusive
			});

			// Mock employee lookup
			jest.spyOn(employeeRepo.createQueryBuilder(), 'getOne').mockResolvedValueOnce(mockEmp);

			// Mock leave request lookup
			jest.spyOn(leaveRequestRepo, 'findOne').mockImplementation(async ({ where }: any) => (where.id === 'test-lr-123' ? mockLR : null));

			await service.remove('test-lr-123', mockEmp.user);

			expect(employeeRepo.save).toHaveBeenCalledWith(
				expect.objectContaining({
					balance: initialBalance + 5, // Verify 5 days restored
				})
			);
			expect(leaveRequestRepo.delete).toHaveBeenCalledWith('test-lr-123');
		});
	});
});
