import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { PassportJwtAuthGuard } from '../auth/guards/jwt-auth/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { GetEmployeeDto } from './dto/responses/getEmployees.dto';
import { EmployeesService } from './employees.service';

@UseGuards(RolesGuard)
@UseGuards(PassportJwtAuthGuard)
@Controller('employees')
export class EmployeesController {
	constructor(private readonly employeesService: EmployeesService) {}

	@Roles(Role.manager)
	@Get()
	@ApiOperation({ summary: 'Get all employees' })
	@ApiResponse({ status: 200, description: 'Employees found', type: [GetEmployeeDto] })
	getEmployees(@Request() req) {
		return this.employeesService.findAll(req.user);
	}

	@Roles(Role.employee)
	@Get('me')
	@ApiOperation({ summary: 'Get the current employee' })
	@ApiResponse({ status: 200, description: 'Employee found', type: GetEmployeeDto })
	getMe(@Request() req) {
		return this.employeesService.findOne(req.user.id);
	}
}
