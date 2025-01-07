import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";

type AuthInput = { email: string; password: string };
type SignInData = { email: string; password: string };
type AuthResult = { accessToken: string; userId: string; email: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findByEmail(input.email);

    // Checks if the password matches the hashed password
    if (await bcrypt.compare(input.password, user.password)) {
      return {
        email: user.email,
        password: user.password,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    // Finds the user from the database using email
    const userDb = await this.usersService.findByEmail(user.email);
    // Throws an error if the user is not found
    if (!userDb) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userDb.password
    );

    // Throws an error if the password is incorrect
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    // Creates a JWT access token for the user
    const accessToken = await this.jwtService.signAsync({
      userId: userDb.id,
      email: userDb.email,
    });
    // Returns the token and user information
    return { accessToken, email: user.email, userId: userDb.id };
  }
}
