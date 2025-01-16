import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    employeesService = module.get<EmployeesService>(EmployeesService);
    employeesController = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(employeesController).toBeDefined(); 
  });
});
