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
import { AuthService } from "./auth.service";
import { PassportJwtAuthGuard } from "./guards/passport-jwt.guard";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { LoginInput, AuthResult, UserInfo } from "./auth.dto";

// Swagger Tag voor de Auth controller
@ApiTags("Auth")
@Controller("auth")
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("local"), PassportLocalGuard)
  @ApiOperation({ summary: "Login gebruiker" })
  @ApiBody({
    description: "Inloggegevens van de gebruiker",
    type: LoginInput,
  })
  // Beschrijft de verwachte succesvolle respons van de endpoint voor Swagger UI.
  @ApiResponse({
    status: 200,
    description: "Succesvol ingelogd, retourneert JWT-token en gebruikersinfo",
    type: AuthResult,
  })
  // Beschrijft de verwachte succesvolle respons van de endpoint voor Swagger UI.
  @ApiResponse({
    status: 401,
    description: "Ongeautoriseerd - Foutieve inloggegevens",
  })
  // Verwerkt de inlogaanvraag van de gebruiker.
  login(@Body() user: LoginInput): Promise<AuthResult> {
    return this.authService.signIn({ email: user.login, password: user.pass });
  }

  @Get("me")
  @UseGuards(PassportJwtAuthGuard)
  // Beschrijft de functionaliteit van de huidige endpoint voor Swagger UI.
  @ApiOperation({ summary: "Haal huidige gebruikersinformatie op" })
  // Beschrijft de verwachte succesvolle respons van de endpoint voor Swagger UI.
  @ApiResponse({
    status: 200,
    description: "Retourneert de informatie van de ingelogde gebruiker",
    type: UserInfo,
  })
  // Beschrijft de verwachte succesvolle respons van de endpoint voor Swagger UI.
  @ApiResponse({
    status: 401,
    description: "Ongeautoriseerd - Geen geldige JWT-token",
  })
  // Haalt de informatie op van de ingelogde gebruiker uit de request object.
  GetUserInfo(@Request() request): UserInfo {
    return request.user;
  }
}
