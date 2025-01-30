import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Employee } from '../../entities/employee.entity';
import { LeaveRequest, LeaveRequestStatus, LeaveRequestType } from '../../entities/leave-request.entity';

export class LeaveRequestSeeder implements Seeder {
	track?: boolean;

	async run(datasource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		// Your implementation here
		const leaveRequestRepository = datasource.getRepository(LeaveRequest);
		const employeeRepository = datasource.getRepository(Employee);

		const employees = await employeeRepository.find();

		for (const employee of employees) {
			const amount = faker.number.int({ min: 1, max: 5 });

			for (let i = 0; i < amount; i++) {
				await leaveRequestRepository.save(
					leaveRequestRepository.create({
						employee: employee,
						startDate: faker.date.past(),
						endDate: faker.date.future(),
						createdAt: new Date(),
						updatedAt: new Date(),
						reason: faker.helpers.arrayElement(['Vacation', 'Wedding', 'Personal']),
						type: faker.helpers.enumValue(LeaveRequestType),
						status: faker.helpers.enumValue(LeaveRequestStatus),
					})
				);
			}
		}
	}
}
