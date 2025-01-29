import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/entities/employee.entity";
import { LeaveRequestStatus, LeaveRequestType } from "src/entities/leave-request.entity";

export class CreateLeaveRequestResponseDto {
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
        description: 'The reason for the leave request. Holiday or personal',
        example: 'Vacation',
    })
    type: LeaveRequestType;

    @ApiProperty({
        description: 'The status of the leave request. Pending, approved, or denied',
        example: 'Pending',
    })
    status: LeaveRequestStatus;

    @ApiProperty({
        description: 'The reason for the leave request',
        example: 'Going on vacation',
    })
    reason: string;

    @ApiProperty({
        description: 'The employee who made the leave request',
        example: {
                id: '1234-1234-1234',
                createdAt: '2021-09-01T00:00:00.000Z',
                updatedAt: '2021-09-01T00:00:00.000Z',
                balance: 10,
        }
    })
    employee: Omit<Employee, 'password' | 'user'>;;
}