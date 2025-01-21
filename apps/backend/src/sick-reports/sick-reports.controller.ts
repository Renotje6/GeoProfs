import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { PassportJwtAuthGuard } from 'src/auth/guards/jwt-auth/passport-jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { User } from '../entities/user.entity';
import { UpdateSickReportDto } from './dto/update-sick-report.dto';
import { SickReportsService } from './sick-reports.service';

@Roles(Role.employee)
@UseGuards(RolesGuard)
@UseGuards(PassportJwtAuthGuard)
@Controller('sick-reports')
export class SickReportsController {
  constructor(private readonly sickReportsService: SickReportsService) {}

  @Post()
  create(@Request() request) {
    const user: User = request.user;

    return this.sickReportsService.create(request.user);
  }

  @Roles(Role.manager)
  @Get()
  findAll() {
    return this.sickReportsService.findAll();
  }

  @Roles(Role.manager, Role.employee)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sickReportsService.findOne(+id);
  }

  @Roles(Role.manager, Role.employee)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSickReportDto: UpdateSickReportDto) {
    return this.sickReportsService.update(+id, updateSickReportDto);
  }
}
