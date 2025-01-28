import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { LeaveRequestType } from "src/entities/leave-request.entity";

export class CreateLeaveRequestDto {
    @IsDate()
    @Transform(({ value }) => new Date(value))
    startDate: Date;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    endDate: Date;

    @IsString()
    @IsOptional()
    reason: string;

    @IsEnum(LeaveRequestType)
    type: LeaveRequestType;
}
