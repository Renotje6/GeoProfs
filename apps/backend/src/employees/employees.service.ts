import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { Employee } from '../entities/employee.entity';
import { Manager } from '../entities/manager.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class EmployeesService {
	constructor(
		@InjectRepository(Employee)
		private employeesRepository: Repository<Employee>,
		@InjectRepository(Department)
		private departmentRepository: Repository<Department>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Manager)
		private managerRepository: Repository<Manager>
	) {}

	async findAll(user: User): Promise<Employee[]> {
		const manager = await this.managerRepository.createQueryBuilder('manager').leftJoinAndSelect('manager.department', 'department').where('manager.userId = :managerId', { managerId: user.id }).getOne();

		return this.employeesRepository.createQueryBuilder('employee').leftJoinAndSelect('employee.user', 'user').where('employee.departmentId = :departmentId', { departmentId: manager.department.id }).getMany();
	}

	findOne(id: string): Promise<Employee> {
		console.log(id)
		return this.employeesRepository.createQueryBuilder('employee').leftJoinAndSelect('employee.user', 'user').where('employee.userId = :id', { id }).getOne();
	}

	findByEmail(email: string): Promise<Employee | null> {
		return this.employeesRepository
			.createQueryBuilder('employee')
			.leftJoinAndSelect('employee.id', 'user') // Join the `User` entity
			.leftJoinAndSelect('employee.department', 'department') // Join the `Department` entity (if needed)
			.where('user.email = :email', { email }) // Filter by `User.email`
			.getOne(); // Get the single result
	}
}
