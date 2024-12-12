import { Column, Entity, OneToOne } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Employee extends User {
	@Column()
	balance: number;
	
	@OneToOne(() => Department)
	department: Department;
}
