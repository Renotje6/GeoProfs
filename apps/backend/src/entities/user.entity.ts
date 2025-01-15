import * as bcrypt from "bcrypt";
import { Role } from "../auth/enums/role.enum";

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	avatar: string;

	@Column()
	password: string;

	@Column({
		type: "enum",
		enum: Role,
		default: Role.employee,
	})
	role: Role;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
