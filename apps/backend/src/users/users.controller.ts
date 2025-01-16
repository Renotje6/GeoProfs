import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { UserCreateInput, UserResult } from "./user.dto";
import { Role } from "../auth/enums/role.enum";
import { Roles } from "../auth/decorators/roles.decorator";
import { PassportJwtAuthGuard } from "../auth/guards/jwt-auth/passport-jwt.guard";
import { RolesGuard } from "../auth/guards/roles/roles.guard";
@ApiTags("users")
@Roles(Role.employee) // role employee for the whole user
@UseGuards(RolesGuard) // roleguard runs recond
@UseGuards(PassportJwtAuthGuard) // authguard runs first
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
