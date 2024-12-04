import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "./configs/jwt-secret";
import { PassportModule } from "@nestjs/passport";
import { PassportAuthController } from "./passport.auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  controllers: [AuthController, PassportAuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
