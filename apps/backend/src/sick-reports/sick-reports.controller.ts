import { Controller, Get, HttpStatus, Param, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { PassportJwtAuthGuard } from 'src/auth/guards/jwt-auth/passport-jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from '../entities/user.entity';
import { SickReportsService } from './sick-reports.service';

// @Roles(Role.employee)
@UseGuards(RolesGuard)
@UseGuards(PassportJwtAuthGuard)
@Controller('sick-reports')
export class SickReportsController {
  constructor(private readonly sickReportsService: SickReportsService) {}

  @Roles(Role.employee)
  @Post()
  async create(@Request() request, @Res() res: Response) {
    const user: User = request.user;

    // Check if the user has an active sick report
    if(await this.sickReportsService.userHasActiveSickReport(user)) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: 'User already has an active sick report'});
    }

    const sickReport = await this.sickReportsService.create(request.user);

    return res.status(HttpStatus.CREATED).json({message: 'Sick report created', data: sickReport});
  }

  @Patch(":id/end")
  @Roles(Role.employee)
  async endSickReport(@Request() request, @Res() res: Response, @Param('id') id: string) {
    const user: User = request.user;

    // Check if the user has an active sick report
    if(!await this.sickReportsService.userHasActiveSickReport(user)) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: 'User does not have an active sick report'});
    }

    const sickReport = await this.sickReportsService.findOne(id);

    if(sickReport.user.id !== user.id) {
      return res.status(HttpStatus.FORBIDDEN).json({message: 'User is not the owner of the sick report'});
    }

    await this.sickReportsService.update(id, {endDate: new Date()});

    return res.status(HttpStatus.OK).json({message: 'Sick report ended'});
  }

  @Roles(Role.manager, Role.employee)
  @Get()
  findAll(@Request() request) {
    const role = request.user.role;

    if(role === Role.manager) {
      return this.sickReportsService.findAllManager(request.user);
    } else {
      return this.sickReportsService.findMine(request.user);
    }
  }

  @Roles(Role.manager, Role.employee)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sickReportsService.findOne(id);
  }
}
