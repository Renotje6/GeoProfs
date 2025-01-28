import { Body, Controller, Delete, Get, Param, Patch, Post, Request, Res, Response, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeaveRequestStatus } from 'src/entities/leave-request.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { PassportJwtAuthGuard } from '../auth/guards/jwt-auth/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { LeaveRequestsService } from './leave-requests.service';

@UseGuards(RolesGuard)
@UseGuards(PassportJwtAuthGuard)
@Controller('leave-requests')
export class LeaveRequestsController {
	constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

	@Roles(Role.employee)
	@Post()
	@ApiOperation({ summary: 'Create a new leave request' })
	@ApiBody({ type: CreateLeaveRequestDto })
	@ApiResponse({ status: 201, description: 'Leave request created' })
	@ApiResponse({ status: 400, description: 'Invalid start date' })
	@ApiResponse({ status: 400, description: 'Invalid end date' })
	async create(@Body() createLeaveRequestDto: CreateLeaveRequestDto, @Request() req, @Response() res) {
		const user = req.user;

		// check if the start date is before the end date and if they are in the future
		if (createLeaveRequestDto.startDate < new Date()) {
			return res.status(400).json({ message: 'Start date must be in the future' });
		}

		if (createLeaveRequestDto.startDate >= createLeaveRequestDto.endDate) {
			return res.status(400).json({ message: 'Start date must be before the end date' });
		}

		try {
			const leaveRequest = await this.leaveRequestsService.create(createLeaveRequestDto, user);
			return res.status(201).json(leaveRequest);
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	}

	@Roles(Role.manager, Role.employee)
	@Get()
	@ApiOperation({ summary: 'Get all leave requests. Managers can see all leave requests, employees can see their own' })
	@ApiResponse({ status: 200, description: 'All leave requests' })
	findAll(@Request() req) {
		const role = req.user.role;

		if (role === Role.manager) {
			return this.leaveRequestsService.findAllManager(req.user);
		} else {
			return this.leaveRequestsService.findMine(req.user);
		}
	}

	@Roles(Role.manager, Role.employee)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.leaveRequestsService.findOne(id);
	}

	@Roles(Role.manager)
	@Patch(':id/:status')
	async updateStatus(@Param('id') id: string, @Param('status') status: string, @Request() req, @Res() res) {
		// Check if the leave request exists
		if (!(await this.leaveRequestsService.findOne(id))) {
			return res.status(404).json({ message: 'Leave request not found' });
		}

		// Check if the status is valid
		if (!(<any>Object).values(LeaveRequestStatus).includes(status)) {
			return res.status(400).json({ message: 'Invalid status' });
		}

		try {
			const leaveRequest = await this.leaveRequestsService.updateStatus(id, status as LeaveRequestStatus, req.user);
			return res.status(200).json(leaveRequest);
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	}

	@Roles(Role.employee)
	@Delete(':id')
	async remove(@Param('id') id: string, @Request() req, @Res() res) {
		try {
			await this.leaveRequestsService.remove(id, req.user);
			return res.status(200).json({ message: 'Leave request deleted' });
		} catch (e) {
			return res.status(400).json({ message: e.message });
		}
	}
}
