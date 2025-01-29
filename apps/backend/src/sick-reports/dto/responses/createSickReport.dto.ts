import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/entities/employee.entity';
import { SickReport } from 'src/entities/sickReport.entity';

export class CreateSickReportDto {
	@ApiProperty({
		description: 'The message that the sick report was created',
		example: 'Sick report created',
	})
	message: string;

	@ApiProperty({
		example: {
			id: '1234-1234-1234',
			startDate: '2021-09-01T00:00:00.000Z',
			endDate: null,
			createdAt: '2021-09-01T00:00:00.000Z',
			updatedAt: '2021-09-01T00:00:00.000Z',
			employee: {
				id: '1234-1234-1234',
				createdAt: '2021-09-01T00:00:00.000Z',
				updatedAt: '2021-09-01T00:00:00.000Z',
				balance: 10,
			},
		},
		description: 'The created sick report',
	})
	data: {
		employee: Omit<Employee, 'password' | 'user'>;
	} & SickReport;
}
