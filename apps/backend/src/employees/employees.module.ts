import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "../entities/employee.entity";
import { Manager } from "../entities/manager.entity";
import { EmployeesController } from "./employees.controller";
import { EmployeesService } from "./employees.service";

@Module({
	imports: [TypeOrmModule.forFeature([Employee, Manager])],
	providers: [EmployeesService],
	exports: [EmployeesService],
	controllers: [EmployeesController],
})
export class EmployeesModule {}
