import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() input: { username: string; password: string }) {
		return this.authService.authenticate(input);
	}

	@UseGuards(AuthGuard)
	// this endpoint in protected by AuthGuard
	@Get('me')
	GetUserInfo(@Request() request) {
		return request.user;
	}
}
