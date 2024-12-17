import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "src/entities/department.entity";
import { Employee } from "src/entities/employee.entity";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
	imports: [TypeOrmModule.forFeature([Employee, Department])],
	providers: [EmployeesService],
	exports: [EmployeesService],
	controllers: [EmployeesController],
})
export class EmployeesModule {}
