import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Role } from "../../auth/enums/role.enum";
import { Department } from "../../entities/department.entity";
import { Manager } from "../../entities/manager.entity";
import { User } from "../../entities/user.entity";

export default class ManagerSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<any> {
		const userRepository = dataSource.getRepository(User);
		const managerRepository = dataSource.getRepository(Manager);
		const departmentRepository = dataSource.getRepository(Department);

		const testManager = {
			email: "manager@mail.com",
			password: "password",
			avatar: faker.image.avatar(),
			name: "Test Manager",
			role: Role.manager,
			department: null,
		};

		// Create a new manager and assign it to a department
		const managers: {
			email: string;
			password: string;
			avatar: string;
			name: string;
			department: Department | null;
		}[] = Array.from({ length: 10 }, () => ({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
			password: faker.internet.password(),
			role: Role.manager,
			department: null,
		}));

		managers.push(testManager);

		// Grab 10 random departments
		const departments = await departmentRepository.find({
			take: managers.length,
		});

		for (const department of departments) {
			const manager = managers.pop();
			manager.department = department;
			const newUser = await userRepository.save(userRepository.create(manager));
			await managerRepository.save(
				managerRepository.create({
					id: newUser.id,
					department,
				}),
			);
		}
	}
}
