import { Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Manager extends BaseEntity {
	@OneToOne(
		() => User,
		(user) => user.id,
		{ eager: true, cascade: true },
	)
	@JoinColumn() // This will act as the primary key and foreign key
	user: User;

	@OneToOne(
		() => Department,
		(department) => department.manager,
	) // Owning side
	@JoinColumn() // This defines the foreign key column
	department: Department;
}
