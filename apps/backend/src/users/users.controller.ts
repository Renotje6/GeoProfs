import { Controller } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UserCreateInput } from "./user.dto";
import { UsersService } from "./users.service";
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    description: "User creation data",
    type: UserCreateInput,
  })
  create(
    @Body()
    createUserDto: {
      email: string;
      password: string;
      avatar: string;
      name: string;
    }
  ) {
    return this.usersService.insert(createUserDto);
  }
}
