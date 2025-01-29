import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "../entities/employee.entity";
import {
	LeaveRequest,
	LeaveRequestStatus,
} from "../entities/leave-request.entity";
import { Manager } from "../entities/manager.entity";
import { User } from "../entities/user.entity";
import { CreateLeaveRequestDto } from "./dto/create-leave-request.dto";

@Injectable()
export class LeaveRequestsService {
	constructor(
		@InjectRepository(LeaveRequest)
		private leaveRequestRepository: Repository<LeaveRequest>,
		@InjectRepository(Employee)
		private employeeRepository: Repository<Employee>,
		@InjectRepository(Manager)
		private managerRepository: Repository<Manager>,
	) {}

	async create(createLeaveRequestDto: CreateLeaveRequestDto, user: User) {
		const employee = await this.employeeRepository
			.createQueryBuilder("employee")
			.where("employee.userId = :userId", { userId: user.id })
			.getOne();

		if (!employee) {
			throw new Error("Employee not found");
		}

		// Calculate days correctly
		const timeDiff =
			createLeaveRequestDto.endDate.getTime() -
			createLeaveRequestDto.startDate.getTime();
		const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

		if (employee.balance < totalDays) {
			throw new Error("Employee does not have enough days off left");
		}

		employee.balance -= totalDays;
		await this.employeeRepository.save(employee);

		return this.leaveRequestRepository.save(
			this.leaveRequestRepository.create({
				...createLeaveRequestDto,
				employee,
			}),
		);
	}

	async findAllManager(user: User) {
		const manager = await this.managerRepository
			.createQueryBuilder("manager")
			.leftJoinAndSelect("manager.department", "department")
			.where("manager.userId = :userId", { userId: user.id })
			.getOne();

		if (!manager?.department) {
			throw new Error("Manager department not found");
		}

		return this.leaveRequestRepository
			.createQueryBuilder("request")
			.leftJoinAndSelect("request.employee", "employee")
			.where("employee.departmentId = :departmentId", {
				departmentId: manager.department.id,
			})
			.getMany();
	}

	async updateStatus(id: string, status: LeaveRequestStatus, user: User) {
		const manager = await this.managerRepository
			.createQueryBuilder("manager")
			.leftJoinAndSelect("manager.department", "department")
			.where("manager.userId = :userId", { userId: user.id })
			.getOne();

		if (!manager?.department) {
			throw new Error("Manager department not found");
		}

		const leaveRequest = await this.leaveRequestRepository.findOne({
			where: { id },
			relations: ["employee.department"],
		});

		if (!leaveRequest) {
			throw new Error("Leave request not found");
		}

		if (manager.department.id !== leaveRequest.employee.department.id) {
			throw new Error("Manager is not in the same department as the employee");
		}

		leaveRequest.status = status;
		return this.leaveRequestRepository.save(leaveRequest);
	}

	async remove(id: string, user: User) {
		// Get employee with relations
		const employee = await this.employeeRepository
			.createQueryBuilder("employee")
			.leftJoinAndSelect("employee.user", "user")
			.where("user.id = :userId", { userId: user.id })
			.getOne();

		if (!employee) {
			throw new Error("Employee not found");
		}

		const leaveRequest = await this.leaveRequestRepository.findOne({
			where: { id },
			relations: ["employee"],
		});

		if (!leaveRequest) {
			throw new Error("Leave request not found");
		}

		// Validate ownership
		if (leaveRequest.employee.id !== employee.id) {
			throw new Error("User is not the owner of the leave request");
		}

		// Calculate days correctly
		const timeDiff =
			leaveRequest.endDate.getTime() - leaveRequest.startDate.getTime();
		const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

		// Restore balance
		employee.balance += totalDays;
		await this.employeeRepository.save(employee);

		return this.leaveRequestRepository.delete(id);
	}

	async findMine(user: User) {
		const employee = await this.employeeRepository
			.createQueryBuilder()
			.where("employee.userId = :employeeId", { employeeId: user.id })
			.getOne();

		if (!employee) {
			throw new Error("Employee not found");
		}

		return this.leaveRequestRepository
			.createQueryBuilder("leaveRequest")
			.where("leaveRequest.requested_by = :employeeId", {
				employeeId: employee.id,
			})
			.getMany();
	}

	findOne(id: string) {
		return this.leaveRequestRepository.findOne({ where: { id } });
	}
}
