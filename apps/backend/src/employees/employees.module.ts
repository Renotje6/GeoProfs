import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "../entities/department.entity";
import { Employee } from "../entities/employee.entity";
import { User } from "../entities/user.entity";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, User])],
  providers: [EmployeesService],
  exports: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
