import { Module } from '@nestjs/common';
import { SickReportsService } from './sick-reports.service';
import { SickReportsController } from './sick-reports.controller';

@Module({
  controllers: [SickReportsController],
  providers: [SickReportsService],
})
export class SickReportsModule {}
