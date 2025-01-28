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
});
