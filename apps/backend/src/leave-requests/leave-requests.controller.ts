import { Body, Controller, Delete, Get, Param, Patch, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { PassportJwtAuthGuard } from '../auth/guards/jwt-auth/passport-jwt.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
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
  async create(@Body() createLeaveRequestDto: CreateLeaveRequestDto, @Request() req, @Response() res) {
    const user = req.user;

    // check if the start date is before the end date and if they are in the future
    if(createLeaveRequestDto.startDate < new Date()) {
      return res.status(400).json({ message: 'Start date must be in the future' });
    }

    if (createLeaveRequestDto.startDate >= createLeaveRequestDto.endDate) {
      return res.status(400).json({ message: 'Start date must be before the end date' });
    }

    try {

      const leaveRequest = await this.leaveRequestsService.create(createLeaveRequestDto, user);
      return res.status(201).json(leaveRequest);

    }catch(e) {
      return res.status(400).json({ message: e.message });
    }
  }

  @Get()
  findAll() {
    return this.leaveRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveRequestDto: UpdateLeaveRequestDto) {
    return this.leaveRequestsService.update(+id, updateLeaveRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveRequestsService.remove(+id);
  }
}
