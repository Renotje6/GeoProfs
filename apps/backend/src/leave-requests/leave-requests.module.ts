import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "../entities/department.entity";
import { Employee } from "../entities/employee.entity";
import { LeaveRequest } from "../entities/leave-request.entity";
import { Manager } from "../entities/manager.entity";
import { User } from "../entities/user.entity";
import { LeaveRequestsController } from "./leave-requests.controller";
import { LeaveRequestsService } from "./leave-requests.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([LeaveRequest, Employee, Manager, Department, User]),
	],
	controllers: [LeaveRequestsController],
	providers: [LeaveRequestsService],
})
export class LeaveRequestsModule {}
