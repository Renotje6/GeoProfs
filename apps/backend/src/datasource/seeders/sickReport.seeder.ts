import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Employee } from '../../entities/employee.entity';
import { SickReport } from '../../entities/sickReport.entity';

export default class SickReportSeeder implements Seeder {
	track?: boolean;
	async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const sickReportRepository = dataSource.getRepository(SickReport);
		const employeeRepository = dataSource.getRepository(Employee);

		const employees = await employeeRepository.find();

		for (const employee of employees) {
			await sickReportRepository.save(
				sickReportRepository.create({
					employee: employee,
					startDate: faker.date.past(),
					endDate: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				})
			);
		}

		// Grab 10 random employees who are still sick
		const randomEmployees = faker.helpers.arrayElements(employees, 10);

		for (const employee of randomEmployees) {
			await sickReportRepository.save(
				sickReportRepository.create({
					employee,
					startDate: faker.date.past(),
					endDate: null,
				})
			);
		}
	}
}
