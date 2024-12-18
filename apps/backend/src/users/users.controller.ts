import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { UserCreateInput, UserResult } from './user.dto';
@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiBody({
		description: 'User creation data',
		type: UserCreateInput,
	  })
	create(
		@Body()
		createUserDto: {
			email: string;
			password: string;
			avatar: string;
			name: string;
		},
	) {
		return this.usersService.insert(createUserDto);
	}
}
