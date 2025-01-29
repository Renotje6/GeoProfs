import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Role } from '../auth/enums/role.enum';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
	@Column()
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	avatar: string;

	@Column({ select: false })
	password: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.employee,
	})
	role: Role;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
