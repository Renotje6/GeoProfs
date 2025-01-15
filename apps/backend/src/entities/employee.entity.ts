import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Employee {
	@PrimaryColumn()
	@OneToOne(
		() => User,
		(user) => user.id,
		{ eager: true, cascade: true },
	)
	@JoinColumn({ name: "id" })
	id: string;

	@Column({ default: 0 })
	balance: number;

	@ManyToOne(() => Department, {
		nullable: false,
	})
	@JoinColumn({ name: "departmentId" })
	department: Department;
}
