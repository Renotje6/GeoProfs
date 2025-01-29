import { Test, TestingModule } from "@nestjs/testing";
import { Role } from "../auth/enums/role.enum";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

describe("EmployeesController", () => {
	let controller: EmployeesController;
	let service: EmployeesService;

	const mockEmployee = { id: "emp-123", name: "John Doe" };
	const mockEmployees = [mockEmployee, { id: "emp-456", name: "Jane Smith" }];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EmployeesController],
			providers: [
				{
					provide: EmployeesService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(mockEmployees),
						findOne: jest.fn().mockResolvedValue(mockEmployee),
					},
				},
			],
		}).compile();

		controller = module.get<EmployeesController>(EmployeesController);
		service = module.get<EmployeesService>(EmployeesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getEmployees", () => {
		it("should call service.findAll with authenticated user", async () => {
			const mockUser = { id: "mgr-123", role: Role.manager };
			const req = { user: mockUser };

			const result = await controller.getEmployees(req);

			expect(service.findAll).toHaveBeenCalledWith(mockUser);
			expect(result).toEqual(mockEmployees);
		});

		it("should return the result from service.findAll", async () => {
			const testEmployees = [{ id: "test-1" }, { id: "test-2" }];
			(service.findAll as jest.Mock).mockResolvedValueOnce(testEmployees);

			const result = await controller.getEmployees({ user: {} });
			expect(result).toEqual(testEmployees);
		});
	});

	describe("getMe", () => {
		it("should call service.findOne with authenticated user ID", async () => {
			const mockUser = { id: "emp-123", role: Role.employee };
			const req = { user: mockUser };

			const result = await controller.getMe(req);

			expect(service.findOne).toHaveBeenCalledWith(mockUser.id);
			expect(result).toEqual(mockEmployee);
		});

		it("should return the result from service.findOne", async () => {
			const testEmployee = { id: "test-123" };
			(service.findOne as jest.Mock).mockResolvedValueOnce(testEmployee);

			const result = await controller.getMe({ user: { id: "test-123" } });
			expect(result).toEqual(testEmployee);
		});
	});
});
