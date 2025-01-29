import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../../auth/enums/role.enum';
import { Department } from '../../entities/department.entity';
import { Employee } from '../../entities/employee.entity';
import { User } from '../../entities/user.entity';

export default class EmployeeSeeder implements Seeder {
	public async run(dataSource: DataSource): Promise<any> {
		const userRepository = dataSource.getRepository(User);
		const employeeRepository = dataSource.getRepository(Employee);
		const departmentRepository = dataSource.getRepository(Department);

		const testEmployee = {
			email: 'employee@mail.com',
			password: 'password',
			avatar: faker.image.avatar(),
			name: 'Test Employee',
			role: Role.employee,
			department: null,
		};

		// Fetch up to 10 departments from the database
		const departments = await departmentRepository.find({ take: 10 });

		// Handle the case when no departments exist
		if (departments.length === 0) {
			throw new Error('No departments found in the database. Please add departments before seeding employees.');
		}

		const employees: {
			email: string;
			password: string;
			avatar: string;
			name: string;
			department: Department;
		}[] = Array.from({ length: 100 }, (_, index) => ({
			name: faker.person.fullName(),
			email: `${index}test@mail.com`,
			avatar: faker.image.avatar(),
			password: faker.internet.password(),
			role: Role.employee,
			department: departments[Math.floor(Math.random() * departments.length)],
		}));

		// Add the test employee with a random department
		testEmployee.department = departments[Math.floor(Math.random() * departments.length)];
		employees.push(testEmployee);

		// Seed each employee
		for (const employee of employees) {
			// Create a new user for each employee
			const newUser = await userRepository.save(userRepository.create(employee));

			// Save the employee record, linking it with the user and department
			await employeeRepository.save(
				employeeRepository.create({
					user: newUser,
					createdAt: faker.date.recent(),
					updatedAt: faker.date.recent(),
					balance: faker.number.int({ min: 0, max: 200 }),
					department: employee.department,
				})
			);
		}
	}
}
