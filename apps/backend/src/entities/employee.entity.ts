import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Employee extends User {
	@Column({ default: 0 })
	balance: number;

	@ManyToOne(() => Department, {
		nullable: false,
	})
	@JoinColumn()
	department: Department;
}
