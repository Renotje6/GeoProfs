import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Department } from '../../entities/department.entity';

export default class DepartmentSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const departmentRepository = dataSource.getRepository(Department);
		const uniqueDepartments = faker.helpers.uniqueArray(faker.commerce.department, 15);

		for (const department of uniqueDepartments) {
			await departmentRepository.insert({
				name: department,
			});
		}
	}
}
