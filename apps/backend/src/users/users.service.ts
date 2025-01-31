import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

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
			where: { id },
		});
	}

	findOneIncludingPassword(id: string): Promise<User> {
		return this.usersRepository
			.createQueryBuilder("user")
			.addSelect("user.password")
			.where("user.id = :id", { id })
			.getOne();
	}

	findByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({ where: { email } });
	}

	findByEmailIncludingPassword(email: string): Promise<User> {
		return this.usersRepository
			.createQueryBuilder("user")
			.addSelect("user.password")
			.where("user.email = :email", { email })
			.getOne();
	}
}
