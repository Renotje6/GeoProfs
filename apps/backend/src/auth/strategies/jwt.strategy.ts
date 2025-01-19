import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service"; // Import the AuthService
import { CurrentUser } from "../guards/types/current-user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private authService: AuthService, // Inject AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: { sub: string; username: string }) {
    const userId = payload.sub;  // This is a string from the JWT payload
    const currentUser: CurrentUser = await this.authService.validateJwtUser(userId);  // Pass string to validateJwtUser
    return currentUser;  // Return currentUser object to attach it to the request
  }
}
