import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";
import { Manager } from "./manager.entity";

@Entity()
export class Department {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@OneToMany(
		() => Employee,
		(employee) => employee.department,
	)
	employees: Employee[];

	@OneToMany(
		() => Manager,
		(manager) => manager.department,
	)
	managers: Manager[];
}
