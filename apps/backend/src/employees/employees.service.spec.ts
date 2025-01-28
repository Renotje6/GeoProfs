import { Test, TestingModule } from "@nestjs/testing";
import { EmployeesService } from "./employees.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Employee } from "src/entities/employee.entity";
import { Department } from "src/entities/department.entity";
import { User } from "src/entities/user.entity";

describe("EmployeesService", () => {
  let service: EmployeesService;

  // Mock repositories
  const mockEmployeeRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    save: jest.fn(),
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

  // Basic test to check if the service is defined
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
