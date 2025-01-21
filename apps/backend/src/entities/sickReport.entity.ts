import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity("sick_report")
export class SickReport extends BaseEntity {
    @OneToMany(
        () => User,
        (user) => user.id,
        { eager: true, cascade: true },
    )
    @JoinColumn()
    user: User;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    startDate: Date;

    @Column({ type: "datetime", nullable: true })
    endDate: Date | null;
}