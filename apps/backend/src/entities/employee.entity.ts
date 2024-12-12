import { Column, Entity } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Employee extends User {
	@Column()
	department: string; // TODO: change to foreign key to Department entity

	@Column()
	balance: number;
}
