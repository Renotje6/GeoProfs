import { ApiProperty } from '@nestjs/swagger';
import { Department } from 'src/entities/department.entity';
import { User } from 'src/entities/user.entity';

export class GetEmployeeDto {
	@ApiProperty({
		example: '1234-5678-9012-3456',
		description: 'The id of the employee',
	})
	id: string;
	@ApiProperty({
		description: 'Timestamp of the creation of the employee',
		example: '2021-09-01T00:00:00.000Z',
	})
	createdAt: Date;
	@ApiProperty({
		description: 'Timestamp of the last update of the employee',
		example: '2021-09-01T00:00:00.000Z',
	})
	updatedAt: Date;
	@ApiProperty({
		description: 'The balance of the employee',
		example: 1000,
	})
	balance: number;
	@ApiProperty({
		description: 'The user of the employee',
		example: { id: '1234-5678-9012-3456', email: 'john.doe@mail.com', name: 'John Doe', role: 'employee', createdAt: '2021-09-01T00:00:00.000Z', updatedAt: '2021-09-01T00:00:00.000Z', avatar: 'https://example.com/avatar.jpg' },
	})
	user: User;
	@ApiProperty({
		description: 'The department of the employee',
		example: {
			id: '1234-5678-9012-3456',
			createdAt: '2021-09-01T00:00:00.000Z',
			updatedAt: '2021-09-01T00:00:00.000Z',
			name: 'Department',
		},
	})
	department: Department;
}
