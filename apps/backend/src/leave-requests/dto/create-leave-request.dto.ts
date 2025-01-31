import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { LeaveRequestType } from "src/entities/leave-request.entity";

export class CreateLeaveRequestDto {
	@ApiProperty({
		description: "The start date of the leave request",
		example: "2025-07-29T00:00:00.000Z",
	})
	@IsDate()
	@Transform(({ value }) => new Date(value))
	startDate: Date;

	@ApiProperty({
		description: "The end date of the leave request",
		example: "2025-07-30T00:00:00.000Z",
	})
	@IsDate()
	@Transform(({ value }) => new Date(value))
	endDate: Date;

	@ApiProperty({
		description: "The reason for the leave request",
		example: "Going on vacation",
	})
	@IsString()
	@IsOptional()
	reason: string;

	@ApiProperty({
		description: "The type of leave request. Holiday or personal",
		example: "Holiday",
	})
	@IsEnum(LeaveRequestType)
	type: LeaveRequestType;
}
