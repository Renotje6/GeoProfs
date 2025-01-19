import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { CurrentUser } from "./guards/types/current-user";

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
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (isPasswordValid) {
      return { email: user.email, password: user.password };
    }
    return null;
  }

  async signIn(user: SignInData) {
    const userDb = await this.usersService.findByEmail(user.email);
    if (!userDb) {
      throw new UnauthorizedException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(user.password, userDb.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const accessToken = await this.jwtService.signAsync({
      userId: userDb.id.toString(),  // Convert id to string for JWT
      email: userDb.email,
      role: userDb.role,
    });

    return {
      accessToken,
      email: userDb.email,
      userId: userDb.id.toString(),  // Ensure userId is string in response
      role: userDb.role,
    };
  }

  async validateJwtUser(userId: string): Promise<CurrentUser> {
    const user = await this.usersService.findByEmail(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // Convert id to number here, since CurrentUser expects a number
    const currentUser: CurrentUser = { id: Number(user.id), role: user.role };
    return currentUser;
  }
}
