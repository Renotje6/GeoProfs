import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/entities/employee.entity';
import { LeaveRequest } from 'src/entities/leave-request.entity';

export class GetAllLeaveRequestsManagerDto {
	@ApiProperty({
		example: [
			{
				id: '1234-1234-1234',
				startDate: '2021-09-01T00:00:00.000Z',
				endDate: '2021-09-02T00:00:00.000Z',
				createdAt: '2021-09-01T00:00:00.000Z',
				updatedAt: '2021-09-01T00:00:00.000Z',
				employee: {
					id: '1234-1234-1234',
					createdAt: '2021-09-01T00:00:00.000Z',
					updatedAt: '2021-09-01T00:00:00.000Z',
					balance: 10,
				},
			},
		],
		description: 'The found leave requests',
	})
	data: {
		employee: Omit<Employee, 'password' | 'user'>;
	} & LeaveRequest[];
}
