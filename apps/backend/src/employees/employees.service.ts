import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "src/entities/department.entity";
import { Employee } from "src/entities/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesService {
	constructor(
		@InjectRepository(Employee) private employeesRepository: Repository<Employee>,
		@InjectRepository(Department)
		private departmentRepository: Repository<Department>,
	) {}

	findAll(): Promise<Employee[]> {
		return this.employeesRepository.find();
	}

	findOne(id: string): Promise<Employee> {
		return this.employeesRepository.findOne({ where: { id } });
	}

	findByEmail(email: string): Promise<Employee> {
		return this.employeesRepository.findOne({ where: { email } });
	}

	async insert(employee: {
		email: string;
		password: string;
		avatar: string;
		name: string;
		departmentId: string;
	}): Promise<Employee> {
		if (await this.findByEmail(employee.email)) {
			throw new Error("Employee already exists");
		}

		const department = await this.departmentRepository.findOne({
			where: { id: employee.departmentId },
		});

		return this.employeesRepository.save(
			this.employeesRepository.create({ ...employee, department }),
		);
	}
}
