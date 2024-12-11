import * as bcrypt from "bcrypt";
import { BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";

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

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
