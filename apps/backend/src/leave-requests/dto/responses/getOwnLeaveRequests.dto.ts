import { ApiProperty } from "@nestjs/swagger";
import { LeaveRequestStatus, LeaveRequestType } from "src/entities/leave-request.entity";

export class GetOwnLeaveRequestsDto {
    @ApiProperty({
        example: "1234-1234-1234",
        description: "ID of the leave request",
    })
    id: string;

    @ApiProperty({
        description: 'The date the leave request was created',
        example: '2025-07-29T00:00:00.000Z',
    })
    createdAt: Date;
    
    @ApiProperty({
        description: 'The date the leave request was last updated',
        example: '2025-07-29T00:00:00.000Z',
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'The start date of the leave request',
        example: '2025-07-29T00:00:00.000Z',
    })
    startDate: Date;

    @ApiProperty({
        description: 'The end date of the leave request',
        example: '2025-07-30T00:00:00.000Z',
    })
    endDate: Date;

    @ApiProperty({
        description: 'The reason for the leave request.',
        example: 'Holiday to visit family',
    })
    reason?: string;

    @ApiProperty({
        description: 'The status of the leave request. Pending, approved, or denied',
        example: 'Pending',
    })
    status: LeaveRequestStatus;

    @ApiProperty({
        description: 'The type of leave request. Holiday or personal',
        example: 'holiday',
    })
    type: LeaveRequestType;
}