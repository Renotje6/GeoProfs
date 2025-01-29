import { ApiProperty } from '@nestjs/swagger';

export class GetOwnSickReportsDto {
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
		example: '2021-09-01T00:00:00.000Z | null',
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
}
