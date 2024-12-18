import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { PassportAuthController } from "./passport.auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [PassportAuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
})
export class AuthModule {}
