import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/entities/department.entity';
import { Employee } from 'src/entities/employee.entity';
import { User } from 'src/entities/user.entity';

export class GetSickReportDto {
	@ApiProperty({
		example: '1234-1234-1234',
		description: 'The unique ID of the sick report',
	})
	id: string;

	@ApiProperty({
		example: '2021-09-01T00:00:00.000Z',
		description: 'The start date of the sick report',
	})
	startDate: Date;
	@ApiProperty({
		example: 'null',
		description: 'The end date of the sick report (null if the sick report is still active)',
	})
	endDate: Date | null;
	@ApiProperty({
		example: '2021-09-01T00:00:00.000Z',
		description: 'The creation date of the sick report',
	})
	createdAt: Date;
	@ApiProperty({
		example: '2021-09-01T00:00:00.000Z',
		description: 'The last update date of the sick report',
	})
	updatedAt: Date;

	@ApiProperty({
		example: {
			id: '1234-1234-1234',
			createdAt: '2021-09-01T00:00:00.000Z',
			updatedAt: '2021-09-01T00:00:00.000Z',
			balance: 10,
			user: {
				id: '1234-1234-1234',
				createdAt: '2021-09-01T00:00:00.000Z',
				updatedAt: '2021-09-01T00:00:00.000Z',
				name: 'John Doe',
				email: 'john.doe@mail.com',
				avatar: 'https://example.com/avatar.jpg',
				role: 'employee',
			},
			department: {
				id: '1234-1234-1234',
				createdAt: '2021-09-01T00:00:00.000Z',
				updatedAt: '2021-09-01T00:00:00.000Z',
				name: 'Department',
			},
		},
	})
	employee: Employee & {
		user: Omit<User, 'password'>;
		department: Department;
	};
}
