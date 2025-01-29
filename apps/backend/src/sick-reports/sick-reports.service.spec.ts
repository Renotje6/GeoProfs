import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Manager } from '../entities/manager.entity';
import { SickReport } from '../entities/sickReport.entity';
import { User } from '../entities/user.entity';
import { SickReportsService } from './sick-reports.service';

describe('SickReportsService', () => {
	let service: SickReportsService;
	let sickReportRepo: Repository<SickReport>;
	let employeeRepo: Repository<Employee>;
	let managerRepo: Repository<Manager>;

	const mockUser = { id: 'user-123' } as User;
	const mockEmployee = {
		id: 'emp-123',
		user: { id: 'user-123' },
		department: { id: 'dept-123' },
	} as Employee;

	const mockManager = {
		id: 'mgr-123',
		department: { id: 'dept-123' },
		user: { id: 'user-456' },
	} as Manager;
	const mockSickReport = {
		id: 'report-123',
		employee: mockEmployee,
		startDate: new Date(),
		endDate: null,
	} as SickReport;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SickReportsService,
				{
					provide: getRepositoryToken(SickReport),
					useValue: {
						create: jest.fn().mockImplementation((dto) => dto), // Add this
						save: jest.fn().mockImplementation((report) => Promise.resolve({ ...report, id: 'report-123' })),
						find: jest.fn().mockResolvedValue([mockSickReport]),
						findOne: jest.fn().mockResolvedValue(mockSickReport),
						update: jest.fn(),
						createQueryBuilder: jest.fn(() => ({
							where: jest.fn().mockReturnThis(),
							andWhere: jest.fn().mockReturnThis(),
							getCount: jest.fn(),
							getMany: jest.fn().mockResolvedValue([mockSickReport]),
						})),
					},
				},
				{
					provide: getRepositoryToken(Employee),
					useValue: {
						createQueryBuilder: jest.fn(() => ({
							where: jest.fn().mockReturnThis(),
							getOne: jest.fn().mockResolvedValue(mockEmployee),
							getMany: jest.fn().mockResolvedValue([mockEmployee]),
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
			],
		}).compile();

		service = module.get<SickReportsService>(SickReportsService);
		sickReportRepo = module.get<Repository<SickReport>>(getRepositoryToken(SickReport));
		employeeRepo = module.get<Repository<Employee>>(getRepositoryToken(Employee));
		managerRepo = module.get<Repository<Manager>>(getRepositoryToken(Manager));
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create a new sick report', async () => {
			// Mock employee query
			const employeeQB = {
				where: jest.fn().mockReturnThis(),
				getOne: jest.fn().mockResolvedValue(mockEmployee),
			};
			(employeeRepo.createQueryBuilder as jest.Mock).mockReturnValue(employeeQB);

			// Mock sick report save
			jest.spyOn(sickReportRepo, 'save').mockResolvedValue(mockSickReport);

			const result = await service.create(mockUser);

			expect(employeeQB.where).toHaveBeenCalledWith('employee.userId = :employeeId', { employeeId: mockUser.id });
			expect(sickReportRepo.save).toHaveBeenCalled();
			expect(result).toEqual(mockSickReport);
		});
	});

	describe('findAllManager', () => {
		it('should return sick reports for manager department', async () => {
			// Mock manager with department
			const mockManagerWithDept = {
				...mockManager,
				department: { id: 'dept-123' },
			};

			// Mock manager query
			const managerQB = {
				leftJoinAndSelect: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				getOne: jest.fn().mockResolvedValue(mockManagerWithDept),
			};
			(managerRepo.createQueryBuilder as jest.Mock).mockReturnValue(managerQB);

			// Mock employee query
			const employeeQB = {
				where: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([mockEmployee]),
			};
			(employeeRepo.createQueryBuilder as jest.Mock).mockReturnValue(employeeQB);

			// Mock sick report find
			jest.spyOn(sickReportRepo, 'find').mockResolvedValue([mockSickReport]);

			const result = await service.findAllManager(mockUser);

			expect(managerQB.leftJoinAndSelect).toHaveBeenCalledWith('manager.department', 'department');
			expect(result).toEqual([mockSickReport]);
		});
	});

	describe('findMine', () => {
		it('should return employee sick reports', async () => {
			// Mock employee query
			const employeeQB = {
				where: jest.fn().mockReturnThis(),
				getOne: jest.fn().mockResolvedValue(mockEmployee),
			};
			(employeeRepo.createQueryBuilder as jest.Mock).mockReturnValue(employeeQB);

			// Mock sick report query
			const sickReportQB = {
				where: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([mockSickReport]),
			};
			(sickReportRepo.createQueryBuilder as jest.Mock).mockReturnValue(sickReportQB);

			const result = await service.findMine(mockUser);

			expect(employeeQB.where).toHaveBeenCalledWith('employee.userId = :employeeId', { employeeId: mockUser.id });
			expect(result).toEqual([mockSickReport]);
		});
	});

	describe('findOne', () => {
		it('should return a sick report by id', async () => {
			jest.spyOn(sickReportRepo, 'findOne').mockResolvedValue(mockSickReport);

			const result = await service.findOne('report-123');

			expect(sickReportRepo.findOne).toHaveBeenCalledWith({
				where: { id: 'report-123' },
			});
			expect(result).toEqual(mockSickReport);
		});
	});

	describe('update', () => {
		it('should update a sick report', async () => {
			const updateData = { endDate: new Date() };
			jest.spyOn(sickReportRepo, 'update');

			await service.update('report-123', updateData);

			expect(sickReportRepo.update).toHaveBeenCalledWith('report-123', updateData);
		});
	});

	describe('userHasActiveSickReport', () => {
		it('should return false if no active report', async () => {
			// Mock employee query
			const employeeQB = {
				where: jest.fn().mockReturnThis(),
				getOne: jest.fn().mockResolvedValue(mockEmployee),
			};
			(employeeRepo.createQueryBuilder as jest.Mock).mockReturnValue(employeeQB);

			// Mock sick report query
			const sickReportQB = {
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getCount: jest.fn().mockResolvedValue(0),
			};
			(sickReportRepo.createQueryBuilder as jest.Mock).mockReturnValue(sickReportQB);

			const result = await service.userHasActiveSickReport(mockUser);

			expect(result).toBe(false);
			// Verify employee query
			expect(employeeQB.where).toHaveBeenCalledWith('employee.userId = :employeeId', { employeeId: mockUser.id });
			// Verify sick report query
			expect(sickReportQB.where).toHaveBeenCalledWith(
				'sickReport.employeeId = :employeeId',
				{ employeeId: mockEmployee.id } // Now properly references mockEmployee.id
			);
			expect(sickReportQB.andWhere).toHaveBeenCalledWith('sickReport.endDate IS NULL');
		});
	});
});
