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

@Controller("auth")
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @UseGuards(PassportLocalGuard)
  login(@Body() user: { login: string; pass: string }) {
    return this.authService.signIn({ email: user.login, password: user.pass });
  }

  @Get("me")
  @UseGuards(PassportJwtAuthGuard)
  GetUserInfo(@Request() request) {
    return request.user;
  }
}
