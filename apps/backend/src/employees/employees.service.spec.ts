import { getRepositoryToken } from "@nestjs/typeorm";
import { EmployeesService } from "./employees.service";
import { User } from "src/entities/user.entity";
import { Department } from "src/entities/department.entity";
import { Employee } from "src/entities/employee.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

describe("EmployeesService", () => {
  let service: EmployeesService;

  const mockUsersService = {
    findByEmail: jest.fn(), // Mock for the UsersService method
  };

  const mockJwtService = {
    sign: jest.fn(), // Mock for the JwtService method
  };

  const mockEmployeeRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(null),
    })),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockDepartmentRepository = {
    findOne: jest.fn(),
  };

  const mockUserRepository = {
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, // Ensure AuthService is included
        { provide: UsersService, useValue: mockUsersService }, // Mock for UsersService
        { provide: JwtService, useValue: mockJwtService }, // Mock for JwtService
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findByEmail", () => {
    it("should return null if no employee is found", async () => {
      // Mock the query builder to simulate no result
      mockEmployeeRepository.createQueryBuilder = jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null), // No result
      }));

      const result = await service.findByEmail("john@example.com");

      expect(result).toBeNull(); // Expect null because no employee was found
    });
  });

  describe("insert", () => {
    it("should insert a new employee", async () => {
      const mockEmployeeInput = {
        email: "john@example.com",
        password: "password123",
        avatar: "avatar.png",
        name: "John Doe",
        departmentId: "dep1",
      };

      const mockDepartment = { id: "dep1", name: "HR" };
      const mockUser = {
        id: "user1",
        email: "john@example.com",
        role: "employee",
      };
      const mockEmployee = {
        id: "user1",
        balance: 0,
        department: mockDepartment,
      };

      // Mock the necessary methods
      mockEmployeeRepository.create.mockReturnValue(mockEmployee);
      mockEmployeeRepository.save.mockResolvedValue(mockEmployee);
      mockDepartmentRepository.findOne.mockResolvedValue(mockDepartment);
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.insert(mockEmployeeInput);

      expect(result).toEqual(mockEmployee);
    });

    it("should throw an error if the employee already exists", async () => {
      // Mock the findByEmail method on the service instance
      service.findByEmail = jest.fn().mockResolvedValueOnce({
        id: "1",
        email: "john@example.com",
        // other mock properties of the employee
      });

      // Call insert and expect it to throw an error
      await expect(
        service.insert({
          email: "john@example.com",
          password: "password123",
          avatar: "avatar.png",
          name: "John Doe",
          departmentId: "dep1",
        })
      ).rejects.toThrow("Employee already exists");
    });

    it("should throw an error if the department is not found", async () => {
      mockDepartmentRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.insert({
          email: "john@example.com",
          password: "password123",
          avatar: "avatar.png",
          name: "John Doe",
          departmentId: "dep1",
        })
      ).rejects.toThrow("Department not found");
    });
  });
});
