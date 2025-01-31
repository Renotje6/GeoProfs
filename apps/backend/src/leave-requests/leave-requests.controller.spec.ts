import { Test, TestingModule } from "@nestjs/testing";
import { Role } from "../auth/enums/role.enum";
import {
	LeaveRequest,
	LeaveRequestStatus,
	LeaveRequestType,
} from "../entities/leave-request.entity";
import { User } from "../entities/user.entity";
import { LeaveRequestsController } from "./leave-requests.controller";
import { LeaveRequestsService } from "./leave-requests.service";

describe("LeaveRequestsController", () => {
	let controller: LeaveRequestsController;
	let service: LeaveRequestsService;
	const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

	// Mock entities
	const mockEmployee = {
		id: "emp-123",
		user: { id: "user-123" } as User,
		department: null,
		balance: 0,
		sickReports: [],
	};

	const createMockLeaveRequest = (
		overrides?: Partial<LeaveRequest>,
	): LeaveRequest =>
		({
			id: "lr-123",
			startDate: new Date(Date.now() + 86400000), // Tomorrow
			endDate: new Date(Date.now() + 172800000), // Day after tomorrow
			reason: "Vacation",
			status: LeaveRequestStatus.pending,
			employee: mockEmployee,
			createdAt: new Date(),
			updatedAt: new Date(),
			...overrides,
		}) as LeaveRequest;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LeaveRequestsController],
			providers: [
				{
					provide: LeaveRequestsService,
					useValue: {
						create: jest.fn(),
						findAllManager: jest.fn(),
						findMine: jest.fn(),
						findOne: jest.fn(),
						updateStatus: jest.fn(),
						remove: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<LeaveRequestsController>(LeaveRequestsController);
		service = module.get<LeaveRequestsService>(LeaveRequestsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("create", () => {
		it("should return 400 if start date is in past", async () => {
			const dto = {
				startDate: new Date(Date.now() - 86400000), // Yesterday
				endDate: new Date(),
				reason: "test",
				type: LeaveRequestType.personal,
			};

			await controller.create(dto, { user: mockEmployee.user }, mockResponse);

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Start date must be in the future",
			});
		});

		it("should create leave request when valid", async () => {
			const dto = {
				startDate: new Date(Date.now() + 86400000),
				endDate: new Date(Date.now() + 172800000),
				reason: "Family vacation",
				type: LeaveRequestType.holiday,
			};
			const mockRequest = createMockLeaveRequest(dto);

			jest.spyOn(service, "create").mockResolvedValue(mockRequest);

			await controller.create(dto, { user: mockEmployee.user }, mockResponse);

			expect(service.create).toHaveBeenCalledWith(dto, mockEmployee.user);
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith(mockRequest);
		});
	});

	describe("findAll", () => {
		it("should call findAllManager for managers", async () => {
			const mockManagerUser = { role: Role.manager } as User;
			const mockResult = [createMockLeaveRequest()];

			jest.spyOn(service, "findAllManager").mockResolvedValue(mockResult);

			const result = await controller.findAll({ user: mockManagerUser });

			expect(service.findAllManager).toHaveBeenCalledWith(mockManagerUser);
			expect(result).toEqual(mockResult);
		});
	});

	describe("findOne", () => {
		it("should return leave request by id", async () => {
			const mockRequest = createMockLeaveRequest();
			jest.spyOn(service, "findOne").mockResolvedValue(mockRequest);

			const result = await controller.findOne(mockRequest.id);

			expect(service.findOne).toHaveBeenCalledWith(mockRequest.id);
			expect(result).toEqual(mockRequest);
		});
	});

	describe("updateStatus", () => {
		const mockManagerUser = { role: Role.manager } as User;
		const mockLeaveRequest = createMockLeaveRequest();

		it("should return 404 if request not found", async () => {
			jest.spyOn(service, "findOne").mockResolvedValue(null);

			await controller.updateStatus(
				"invalid-id",
				"APPROVED",
				{ user: mockManagerUser },
				mockResponse,
			);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Leave request not found",
			});
		});

		it("should update status when valid", async () => {
			const updatedRequest = createMockLeaveRequest({
				status: LeaveRequestStatus.approved,
			});

			jest.spyOn(service, "findOne").mockResolvedValue(mockLeaveRequest);
			jest.spyOn(service, "updateStatus").mockResolvedValue(updatedRequest);

			await controller.updateStatus(
				mockLeaveRequest.id,
				LeaveRequestStatus.approved,
				{ user: mockManagerUser },
				mockResponse,
			);

			expect(service.updateStatus).toHaveBeenCalledWith(
				mockLeaveRequest.id,
				LeaveRequestStatus.approved,
				mockManagerUser,
			);
			expect(mockResponse.json).toHaveBeenCalledWith(updatedRequest);
		});
	});

	describe("remove", () => {
		const mockEmployeeUser = { id: "user-123", role: Role.employee } as User;

		it("should delete when authorized", async () => {
			const mockRequest = createMockLeaveRequest();
			jest.spyOn(service, "remove").mockResolvedValue(undefined);

			await controller.remove(
				mockRequest.id,
				{ user: mockEmployeeUser },
				mockResponse,
			);

			expect(service.remove).toHaveBeenCalledWith(
				mockRequest.id,
				mockEmployeeUser,
			);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Leave request deleted",
			});
		});
	});
});
