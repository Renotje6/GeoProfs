import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthResult, LoginInput, UserInfo } from "./auth.dto";
import { AuthService } from "./auth.service";
import { PassportJwtAuthGuard } from "./guards/jwt-auth/passport-jwt.guard";
import { PassportLocalGuard } from "./guards/local.auth/passport-local.guard";

// Swagger Tag for the Auth controller
@ApiTags("Auth")
@Controller("auth")
export class PassportAuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard("local"), PassportLocalGuard)
	@ApiOperation({ summary: "Log in user" })
	@ApiBody({
		description: "Login credentials of the user",
		type: LoginInput,
	})
	// Describes the expected successful response of the endpoint for Swagger UI.
	@ApiResponse({
		status: 200,
		description: "Successfully logged in, returns JWT token and user info",
		type: AuthResult,
	})
	// Describes the expected error response of the endpoint for Swagger UI.
	@ApiResponse({
		status: 401,
		description: "Unauthorized - Invalid login credentials",
	})
	// Processes the user's login request.
	login(@Body() user: LoginInput): Promise<AuthResult> {
		return this.authService.signIn({ email: user.login, password: user.pass });
	}

	@Get("me")
	@UseGuards(PassportJwtAuthGuard)
	// Describes the functionality of the current endpoint for Swagger UI.
	@ApiOperation({ summary: "Retrieve current user information" })
	// Describes the expected successful response of the endpoint for Swagger UI.
	@ApiResponse({
		status: 200,
		description: "Returns the information of the logged-in user",
		type: UserInfo,
	})
	// Describes the expected error response of the endpoint for Swagger UI.
	@ApiResponse({
		status: 401,
		description: "Unauthorized - No valid JWT token",
	})
	// Retrieves the information of the logged-in user from the request object.
	GetUserInfo(@Request() request): UserInfo {
		return request.user;
	}
}
