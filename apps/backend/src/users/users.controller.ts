import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { PassportJwtAuthGuard } from "src/auth/guards/jwt-auth/passport-jwt.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { UsersService } from "./users.service";
@ApiTags("users")
@Roles(Role.Admin) // role employee for the whole user
@UseGuards(RolesGuard) // roleguard runs recond
@UseGuards(PassportJwtAuthGuard) // authguard runs first
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
}
