import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		private configService: ConfigService
	) {}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(id: string): Promise<User> {
		return this.usersRepository.findOne({ where: { id } });
	}

	findByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({ where: { email } });
	}

	async insert(user: { email: string; password: string; avatar: string; name: string }): Promise<User> {
		if (await this.findByEmail(user.email)) {
			throw new Error('User already exists');
		}

		return this.usersRepository.save(this.usersRepository.create(user));
	}
}
