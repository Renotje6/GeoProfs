import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.entity";
@Entity("sick_report")
export class SickReport extends BaseEntity {
	@ManyToOne(
		() => Employee,
		(employee) => employee.user.id,
		{ eager: true },
	)
	@JoinColumn({ name: "employeeId" }) // Correct column name
	employee: Employee;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	startDate: Date;

	@Column({ type: "datetime", nullable: true })
	endDate: Date | null;
}
