import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Employee } from "../entities/employee.entity";
import { Manager } from "../entities/manager.entity";
import { User } from "../entities/user.entity";
import { EmployeesService } from "./employees.service";

describe("EmployeesService", () => {
	let service: EmployeesService;
	let mockEmployeeQB;
	let mockManagerQB;

	const mockEmployeesRepository = {
		createQueryBuilder: jest.fn(() => mockEmployeeQB),
	};

	const mockManagerRepository = {
		createQueryBuilder: jest.fn(() => mockManagerQB),
	};

	beforeEach(async () => {
		// Reset query builder mocks for each test
		mockEmployeeQB = {
			leftJoinAndSelect: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			getOne: jest.fn(),
			getMany: jest.fn(),
		};

		mockManagerQB = {
			leftJoinAndSelect: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			getOne: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EmployeesService,
				{
					provide: getRepositoryToken(Employee),
					useValue: mockEmployeesRepository,
				},
				{
					provide: getRepositoryToken(Manager),
					useValue: mockManagerRepository,
				},
			],
		}).compile();

		service = module.get<EmployeesService>(EmployeesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("findAll", () => {
		it("should return employees from manager department", async () => {
			const mockUser = { id: "user-123", role: "manager" } as User;
			const mockManager = {
				department: { id: "dept-123" },
			};
			const mockEmployees = [{ id: "emp-1" }, { id: "emp-2" }];

			mockManagerQB.getOne.mockResolvedValue(mockManager);
			mockEmployeeQB.getMany.mockResolvedValue(mockEmployees);

			const result = await service.findAll(mockUser);

			expect(mockManagerRepository.createQueryBuilder).toHaveBeenCalledWith(
				"manager",
			);
			expect(mockManagerQB.leftJoinAndSelect).toHaveBeenCalledWith(
				"manager.department",
				"department",
			);
			expect(mockManagerQB.where).toHaveBeenCalledWith(
				"manager.userId = :managerId",
				{ managerId: "user-123" },
			);

			expect(mockEmployeesRepository.createQueryBuilder).toHaveBeenCalledWith(
				"employee",
			);
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith(
				"employee.user",
				"user",
			);
			expect(mockEmployeeQB.where).toHaveBeenCalledWith(
				"employee.departmentId = :departmentId",
				{
					departmentId: "dept-123",
				},
			);

			expect(result).toEqual(mockEmployees);
		});

		it("should throw error if manager not found", async () => {
			const mockUser = { id: "user-123", role: "manager" } as User;
			mockManagerQB.getOne.mockResolvedValue(null);

			await expect(service.findAll(mockUser)).rejects.toThrow("Manager not found");
		});
	});

	describe("findOne", () => {
		it("should return employee by id with user relation", async () => {
			const mockEmployee = { id: "emp-123", name: "John Doe" };
			mockEmployeeQB.getOne.mockResolvedValue(mockEmployee);

			const result = await service.findOne("emp-123");

			expect(mockEmployeesRepository.createQueryBuilder).toHaveBeenCalledWith(
				"employee",
			);
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith(
				"employee.user",
				"user",
			);
			expect(mockEmployeeQB.where).toHaveBeenCalledWith("employee.userId = :id", {
				id: "emp-123",
			});
			expect(result).toEqual(mockEmployee);
		});

		it("should return null if employee not found", async () => {
			mockEmployeeQB.getOne.mockResolvedValue(null);

			const result = await service.findOne("invalid-id");
			expect(result).toBeNull();
		});
	});

	describe("findByEmail", () => {
		it("should return employee by email with relations", async () => {
			const mockEmployee = { id: "emp-123", user: { email: "test@example.com" } };
			mockEmployeeQB.getOne.mockResolvedValue(mockEmployee);

			const result = await service.findByEmail("test@example.com");

			expect(mockEmployeesRepository.createQueryBuilder).toHaveBeenCalledWith(
				"employee",
			);
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith(
				"employee.id",
				"user",
			);
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenCalledWith(
				"employee.department",
				"department",
			);
			expect(mockEmployeeQB.where).toHaveBeenCalledWith("user.email = :email", {
				email: "test@example.com",
			});
			expect(result).toEqual(mockEmployee);
		});

		it("should return null when no employee found", async () => {
			mockEmployeeQB.getOne.mockResolvedValue(null);

			const result = await service.findByEmail("unknown@example.com");
			expect(result).toBeNull();
		});

		// If you want to test the actual query structure
		it("should use correct join syntax", async () => {
			await service.findByEmail("test@example.com");
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenNthCalledWith(
				1,
				"employee.id",
				"user",
			);
			expect(mockEmployeeQB.leftJoinAndSelect).toHaveBeenNthCalledWith(
				2,
				"employee.department",
				"department",
			);
		});
	});
});
