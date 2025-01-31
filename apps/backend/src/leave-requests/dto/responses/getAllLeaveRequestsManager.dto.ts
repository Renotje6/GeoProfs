import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';
import { Employee } from 'src/entities/employee.entity';
import { LeaveRequestStatus, LeaveRequestType } from 'src/entities/leave-request.entity';

export class GetAllLeaveRequestsManagerDto {
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
		},

		description: 'The found leave requests',
	})
	employee: {
		user: {
			id: string;
			createdAt: string;
			updatedAt: string;
			name: string;
			email: string;
			avatar: string;
			role: Role;
		};
	} & Omit<Employee, 'password' | 'user'>;

	@ApiProperty({
		example: '1234-1234-1234',
		description: 'The ID of the leave request',
	})
	id: string;

	@ApiProperty({
		example: '2021-09-01T00:00:00.000Z',
		description: 'The start date of the leave request',
	})
	startDate: Date;

	@ApiProperty({
		example: '2021-09-02T00:00:00.000Z',
		description: 'The end date of the leave request',
	})
	endDate: Date;

	@ApiProperty({
		example: '2021-09-01T00:00:00.000Z',
		description: 'The creation date of the leave request',
	})
	createdAt: Date;

	@ApiProperty({
		example: '2021-09-01T00:00:00.000Z',
		description: 'The last update date of the leave request',
	})
	updatedAt: Date;

	@ApiProperty({
		example: 'holiday',
		description: 'The type of the leave request',
	})
	type: LeaveRequestType;

	@ApiProperty({
		example: 'pending',
		description: 'The status of the leave request',
	})
	status: LeaveRequestStatus;
}
