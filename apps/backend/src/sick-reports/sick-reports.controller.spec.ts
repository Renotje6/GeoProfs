import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { Role } from 'src/auth/enums/role.enum';
import { SickReportsController } from './sick-reports.controller';
import { SickReportsService } from './sick-reports.service';

describe('SickReportsController', () => {
	let controller: SickReportsController;
	let service: SickReportsService;
	const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SickReportsController],
			providers: [
				{
					provide: SickReportsService,
					useValue: {
						userHasActiveSickReport: jest.fn(),
						create: jest.fn(),
						update: jest.fn(),
						findAllManager: jest.fn(),
						findMine: jest.fn(),
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<SickReportsController>(SickReportsController);
		service = module.get<SickReportsService>(SickReportsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should return 400 if user has active sick report', async () => {
			const mockUser = { id: 'user-123', role: Role.employee };
			(service.userHasActiveSickReport as jest.Mock).mockResolvedValue(true);

			await controller.create({ user: mockUser }, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'User already has an active sick report',
			});
		});

		it('should create sick report when no active report exists', async () => {
			const mockUser = { id: 'user-123', role: Role.employee };
			const mockReport = { id: 'report-123' };
			(service.userHasActiveSickReport as jest.Mock).mockResolvedValue(false);
			(service.create as jest.Mock).mockResolvedValue(mockReport);

			await controller.create({ user: mockUser }, mockResponse);

			expect(service.create).toHaveBeenCalledWith(mockUser);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Sick report created',
				data: mockReport,
			});
		});
	});

	describe('endSickReport', () => {
		const mockUser = { id: 'user-123', role: Role.employee };
		const mockRequest = { user: mockUser };
		const mockReport = { id: 'report-123', employee: { user: { id: 'user-123' } } };

		it('should return 400 if no active report', async () => {
			(service.userHasActiveSickReport as jest.Mock).mockResolvedValue(false);

			await controller.endSickReport(mockRequest, mockResponse, 'report-123');

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'User does not have an active sick report',
			});
		});

		it('should return 404 if report not found', async () => {
			(service.userHasActiveSickReport as jest.Mock).mockResolvedValue(true);
			(service.findOne as jest.Mock).mockResolvedValue(null);

			await controller.endSickReport(mockRequest, mockResponse, 'invalid-id');

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Sick report not found',
			});
		});

		it('should return 403 if user not owner', async () => {
			(service.userHasActiveSickReport as jest.Mock).mockResolvedValue(true);
			(service.findOne as jest.Mock).mockResolvedValue({
				...mockReport,
				employee: { user: { id: 'different-user' } },
			});

			await controller.endSickReport(mockRequest, mockResponse, 'report-123');

			expect(mockResponse.status).toHaveBeenCalledWith(403);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'User is not the owner of the sick report',
			});
		});

		it('should end sick report successfully', async () => {
			(service.userHasActiveSickReport as jest.Mock).mockResolvedValue(true);
			(service.findOne as jest.Mock).mockResolvedValue(mockReport);

			await controller.endSickReport(mockRequest, mockResponse, 'report-123');

			expect(service.update).toHaveBeenCalledWith('report-123', {
				endDate: expect.any(Date),
			});
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: 'Sick report ended',
			});
		});
	});

	describe('findAll', () => {
		it('should call findAllManager for managers', async () => {
			const mockUser = { id: 'mgr-123', role: Role.manager };
			const mockResult = [{ id: 'report-1' }];
			(service.findAllManager as jest.Mock).mockResolvedValue(mockResult);

			const result = await controller.findAll({ user: mockUser });

			expect(service.findAllManager).toHaveBeenCalledWith(mockUser);
			expect(result).toEqual(mockResult);
		});

		it('should call findMine for employees', async () => {
			const mockUser = { id: 'emp-123', role: Role.employee };
			const mockResult = [{ id: 'my-report' }];
			(service.findMine as jest.Mock).mockResolvedValue(mockResult);

			const result = await controller.findAll({ user: mockUser });

			expect(service.findMine).toHaveBeenCalledWith(mockUser);
			expect(result).toEqual(mockResult);
		});
	});

	describe('findOne', () => {
		it('should call service with correct ID', async () => {
			const mockReport = { id: 'report-123' };
			(service.findOne as jest.Mock).mockResolvedValue(mockReport);

			const result = await controller.findOne('report-123');

			expect(service.findOne).toHaveBeenCalledWith('report-123');
			expect(result).toEqual(mockReport);
		});
	});
});
