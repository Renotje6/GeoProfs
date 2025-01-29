import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { PassportJwtAuthGuard } from '../auth/guards/jwt-auth/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { UsersService } from './users.service';
@ApiTags('users')
@Roles(Role.Admin) // role employee for the whole user
@UseGuards(RolesGuard) // roleguard runs recond
@UseGuards(PassportJwtAuthGuard) // authguard runs first
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
}
