import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.entity";

export enum LeaveRequestStatus {
    approved = 'approved',
    denied = 'denied',
    pending = 'pending',
}

export enum LeaveRequestType {
    personal = 'personal',
    holiday     = 'holiday',
}

@Entity('leave_request')
export class LeaveRequest extends BaseEntity {
    @ManyToOne(() => Employee, (employee) => employee.user.id, { eager: true })
    @JoinColumn({ name: 'requested_by' }) // Correct column name
    employee: Employee;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column({ type: 'datetime', nullable: true })
    endDate: Date | null;

    @Column({ type: 'text', nullable: true })
    reason: string | null;

    @Column({ type: 'enum', enum: LeaveRequestStatus, default: LeaveRequestStatus.pending })
    status: LeaveRequestStatus;

    @Column({ type: 'enum', enum: LeaveRequestType })
    type: LeaveRequestType;
}
