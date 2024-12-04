import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth')
export class PassportAuthController {
	constructor(private authService: AuthService) {}

	// @UseGuards(AuthGuard('local'))
	@HttpCode(HttpStatus.OK)
	@Post('login')
	// @UseGuards(PassportLocalGuard)
	login(@Body() user: { email: string; password: string }) {
		return this.authService.signIn(user);
	}

	@Get('me')
	@UseGuards(PassportJwtAuthGuard)
	GetUserInfo(@Request() request) {
		return request.user;
	}
}
