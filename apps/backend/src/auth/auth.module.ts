import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_SECRET } from './configs/jwt-secret';
import { PassportAuthController } from './passport.auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	controllers: [AuthController, PassportAuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
		PassportModule,
	],
})
export class AuthModule {}
