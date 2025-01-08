import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
	) {}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(id: string): Promise<User> {
		return this.usersRepository.findOne({ 
			where: { id }
		});
	}

	findByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({ where: { email } });
	}

	async insert(user: {
		email: string;
		password: string;
		avatar: string;
		name: string;
		role: Role;
	}): Promise<User> {
		if (await this.findByEmail(user.email)) {
			throw new Error("User already exists");
		}

		return this.usersRepository.save(this.usersRepository.create(user));
	}
}
