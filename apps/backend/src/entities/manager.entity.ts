import { Entity, OneToOne } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Manager extends User {
	@OneToOne(() => Department, (department) => 
	department.manager)
	department: Department;
}
