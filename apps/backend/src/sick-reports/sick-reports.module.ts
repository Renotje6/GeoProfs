import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { Manager } from '../entities/manager.entity';
import { SickReport } from '../entities/sickReport.entity';
import { User } from '../entities/user.entity';
import { SickReportsController } from './sick-reports.controller';
import { SickReportsService } from './sick-reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([SickReport, User, Manager, Employee])],
  controllers: [SickReportsController],
  providers: [SickReportsService],
})
export class SickReportsModule {}
