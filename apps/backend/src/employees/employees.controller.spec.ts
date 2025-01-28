import { Test, TestingModule } from "@nestjs/testing";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

describe("EmployeesController", () => {
  let controller: EmployeesController;
  let employeesService: jest.Mocked<Partial<EmployeesService>>;

  beforeEach(async () => {
    // Mock the EmployeesService methods
    employeesService = {
      insert: jest.fn(), // Mock the 'insert' method
    };

    // Create a test module with the controller and the mocked service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController], // Provide the EmployeesController
      providers: [
        {
          provide: EmployeesService, // Replace EmployeesService with a mock
          useValue: employeesService,
        },
      ],
    }).compile();

    // Get the instance of the controller
    controller = module.get<EmployeesController>(EmployeesController);
  });

  it("should be defined", () => {
    // Check if the controller is defined
    expect(controller).toBeDefined();
  });

  describe("createEmployee", () => {
    it("should call EmployeesService.insert with the correct data", async () => {
      // Mocked return value for the 'insert' method in EmployeesService
      const mockEmployee = {
        id: "5678-5678-5678",
        email: "john.doe@mail.com",
        name: "John Doe",
        departmentId: "1234-1234-1234",
        balance: 0, // Required field for Employee
        department: null, // Placeholder for department, as it's nullable
      };
      employeesService.insert.mockResolvedValue(mockEmployee); // Simulate resolved value for the service method

      // Call the controller's createEmployee method
      const result = await controller.createEmployee();

      // Assert that EmployeesService.insert is called with the correct parameters
      expect(employeesService.insert).toHaveBeenCalledWith({
        email: "john.doe@mail.com",
        password: "password",
        avatar: "avatar.png",
        name: "John Doe",
        departmentId: "1234-1234-1234",
      });

      // Assert that the returned result matches the mocked employee
      expect(result).toEqual(mockEmployee);
    });
  });
});
