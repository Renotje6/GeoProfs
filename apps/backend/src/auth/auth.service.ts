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

    // Kijkt of het wachtwoord overeen komt met het gehashed wachtwoord
    if (await bcrypt.compare(input.password, user.password)) {
      return {
        email: user.email,
        password: user.password,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    // Vindt de gebruiker uit de database doormiddel van email
    const userDb = await this.usersService.findByEmail(user.email);
    //Error wanneer de gebruiker niet is gevonden
    if (!userDb) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userDb.password
    );

    // Error wanneer wachtwoord verkeerd is
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    // maakt een JWT access token voor de gebruiker
    const accessToken = await this.jwtService.signAsync({
      userId: userDb.id,
      email: userDb.email,
    });
    // Geeft token en gebruikers informatie terug
    return { accessToken, email: user.email, userId: userDb.id };
  }
}
