import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(id: string): Promise<User> {
		return this.usersRepository.findOne({
			where: { id },
		});
	}

	findOneIncludingPassword(id: string): Promise<User> {
		return this.usersRepository.findOne({
			where: { id },
		});
	}

	findByEmail(email: string): Promise<User> {
		return this.usersRepository.findOne({ where: { email } });
	}

	findByEmailIncludingPassword(email: string): Promise<User> {
		return this.usersRepository.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne();
	}
}
