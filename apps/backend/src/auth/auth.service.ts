import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { EmployeesService } from "src/employees/employees.service";
import { UsersService } from "src/users/users.service";

type AuthInput = { email: string; password: string };
type SignInData = { email: string; password: string };
type AuthResult = { accessToken: string; userId: string; email: string };

@Injectable()
export class AuthService {
	constructor(
		private employeeService: EmployeesService,
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(input: AuthInput): Promise<SignInData | null> {
		const user = await this.employeeService.findByEmail(input.email);

		if (await bcrypt.compare(input.password, user.password)) {
			return {
				email: user.email,
				password: user.password,
			};
		}
		return null;
	}

	async signIn(user: SignInData): Promise<AuthResult> {
		const userDb = await this.employeeService.findByEmail(user.email);
		if (!userDb) {
			throw new UnauthorizedException();
		}

		const isPasswordValid = await bcrypt.compare(user.password, userDb.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException();
		}

		const accessToken = await this.jwtService.signAsync({
			userId: userDb.id,
			email: userDb.email,
		});

		return { accessToken, email: user.email, userId: userDb.id };
	}
}
