import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
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
