import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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
