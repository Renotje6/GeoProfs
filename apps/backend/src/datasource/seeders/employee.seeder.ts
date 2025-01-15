import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Role } from "../../auth/enums/role.enum";
import { Department } from "../../entities/department.entity";
import { Employee } from "../../entities/employee.entity";
import { User } from "../../entities/user.entity";

export default class EmployeeSeeder implements Seeder {
	public async run(dataSource: DataSource): Promise<any> {
		const userRepository = dataSource.getRepository(User);
		const employeeRepository = dataSource.getRepository(Employee);
		const departmentRepository = dataSource.getRepository(Department);

		const testEmployee = {
			email: "employee@mail.com",
			password: "password",
			avatar: faker.image.avatar(),
			name: "Test Employee",
			role: Role.employee,
			department: null,
		};

		const employees: {
			email: string;
			password: string;
			avatar: string;
			name: string;
			department: Department | null;
		}[] = Array.from({ length: 100 }, () => ({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
			password: faker.internet.password(),
			role: Role.employee,
			department: null,
		}));

		employees.push(testEmployee);

		// Grab 10 random departments
		const departments = await departmentRepository.find({ take: 10 });

		for (const employee of employees) {
			const department =
				departments[Math.floor(Math.random() * departments.length)];
			employee.department = department;
			const newUser = await userRepository.save(userRepository.create(employee));
			await employeeRepository.save(
				employeeRepository.create({
					user: newUser,
					balance: faker.number.int({ min: 0, max: 200 }),
					department,
				}),
			);
		}
	}
}
