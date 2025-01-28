import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { Employee } from '../entities/employee.entity';
import { LeaveRequest, LeaveRequestStatus } from '../entities/leave-request.entity';
import { Manager } from '../entities/manager.entity';
import { User } from '../entities/user.entity';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';

@Injectable()
export class LeaveRequestsService {
	constructor(
		@InjectRepository(LeaveRequest) private leaveRequestRepository: Repository<LeaveRequest>,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
		@InjectRepository(Manager) private managerRepository: Repository<Manager>,
		@InjectRepository(Department) private departmentRepository: Repository<Department>
	) {}

	async create(createLeaveRequestDto: CreateLeaveRequestDto, user: User) {
		const employee = await this.employeeRepository.createQueryBuilder().where('employee.userId = :employeeId', { employeeId: user.id }).getOne();

		if (!employee) {
			throw new Error('Employee not found');
		}

		// Get the total number of days the employee has requested off from the createLeaveRequestDto
		const totalDays = Math.abs(createLeaveRequestDto.endDate.getDate() - createLeaveRequestDto.startDate.getDate()) || 1;
		console.log(totalDays, employee.balance);
		// Check if the employee has enough days off left
		if (employee.balance < totalDays) {
			throw new Error('Employee does not have enough days off left');
		}

		// Update the employee's balance
		employee.balance -= totalDays;
		await this.employeeRepository.save(employee);

		const leaveRequest = await this.leaveRequestRepository.save(
			this.leaveRequestRepository.create({
				employee,
				...createLeaveRequestDto,
			})
		);

		return leaveRequest;
	}

	async findAllManager(user: User) {
		const manager = await this.managerRepository.createQueryBuilder('manager').leftJoinAndSelect('manager.department', 'department').where('manager.userId = :managerId', { managerId: user.id }).getOne();
		const employees = await this.employeeRepository.createQueryBuilder('employee').where('employee.departmentId = :departmentId', { departmentId: manager.department.id }).getMany();

		return await this.leaveRequestRepository.find({ where: { employee: In(employees.map((employee) => employee.id)) } });
	}

	async findMine(user: User) {
		const employee = await this.employeeRepository.createQueryBuilder().where('employee.userId = :employeeId', { employeeId: user.id }).getOne();

		if (!employee) {
			throw new Error('Employee not found');
		}

		return this.leaveRequestRepository.createQueryBuilder('leaveRequest').where('leaveRequest.requested_by = :employeeId', { employeeId: employee.id }).getMany();
	}

	findOne(id: string) {
		return this.leaveRequestRepository.findOne({ where: { id } });
	}

	async updateStatus(id: string, status: LeaveRequestStatus, user: User) {
		const manager = await this.managerRepository.createQueryBuilder('manager').leftJoinAndSelect('manager.department', 'department').where('manager.userId = :managerId', { managerId: user.id }).getOne();
		const leaveRequest = await this.findOne(id);

		if (manager.department.id !== leaveRequest.employee.department.id) {
			throw new Error('Manager is not in the same department as the employee');
		}

		leaveRequest.status = status;

		return this.leaveRequestRepository.save(leaveRequest);
	}

	async remove(id: string, user: User) {
		// Check if the user is the owner of the leave request
		const leaveRequest = await this.findOne(id);

		if (leaveRequest.employee.user.id !== user.id) {
			throw new Error('User is not the owner of the leave request');
		}

		return this.leaveRequestRepository.delete(id);
	}
}
