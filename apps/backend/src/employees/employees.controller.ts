import { Controller, Post } from "@nestjs/common";
import { EmployeesService } from "./employees.service";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee() {
    return this.employeesService.insert({
      email: "john.doe@mail.com",
      password: "password",
      avatar: "avatar.png",
      name: "John Doe",
      departmentId: "1234-1234-1234",
    });
  }
}
