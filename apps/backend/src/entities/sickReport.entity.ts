import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.entity";
import { User } from "./user.entity";

@Entity("sick_report")
export class SickReport extends BaseEntity {
    @ManyToOne(
        () => Employee,
        (employee) => employee.id,
        { cascade: true },
    )
    @JoinColumn()
    user: User;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: "datetime", nullable: true })
    endDate: Date | null;
}