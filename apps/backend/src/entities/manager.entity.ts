import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Manager extends User {
	@ManyToOne(() => Department, {
		nullable: false,
	})
	@JoinColumn({ name: "department_id" })
	department: Department;

	@Column()
	department_id: string;
}
