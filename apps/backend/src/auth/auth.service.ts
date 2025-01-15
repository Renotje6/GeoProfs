import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";

type AuthInput = { email: string; password: string };
type SignInData = { email: string; password: string };

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(input: AuthInput): Promise<SignInData | null> {
		const user = await this.usersService.findByEmail(input.email);

		if (await bcrypt.compare(input.password, user.password)) {
			return {
				email: user.email,
				password: user.password,
			};
		}
		return null;
	}

	async signIn(user: SignInData) {
		const userDb = await this.usersService.findByEmail(user.email);
		if (!userDb) {
			throw new UnauthorizedException("User not found");
		}

		if (!(await bcrypt.compare(user.password, userDb.password))) {
			throw new UnauthorizedException("Invalid password");
		}

		const accessToken = await this.jwtService.signAsync({
			userId: userDb.id,
			email: userDb.email,
		});

		return {
			accessToken,
			email: user.email,
			userId: userDb.id,
			role: userDb.role,
		};
	}
}
