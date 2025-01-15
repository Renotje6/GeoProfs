import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Employee extends BaseEntity {
  @OneToOne(() => User, (user) => user.id, { eager: true, cascade: true })
  @JoinColumn()
  userId: string;

	@Column({ default: 0 })
	balance: number;

	@ManyToOne(() => Department, {
		nullable: false,
	})
	@JoinColumn({ name: "departmentId" })
	department: Department;
}
