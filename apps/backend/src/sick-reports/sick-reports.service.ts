import { Injectable } from '@nestjs/common';
import { CreateSickReportDto } from './dto/create-sick-report.dto';
import { UpdateSickReportDto } from './dto/update-sick-report.dto';

@Injectable()
export class SickReportsService {
  create(createSickReportDto: CreateSickReportDto) {
    return 'This action adds a new sickReport';
  }

  findAll() {
    return `This action returns all sickReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sickReport`;
  }

  update(id: number, updateSickReportDto: UpdateSickReportDto) {
    return `This action updates a #${id} sickReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} sickReport`;
  }
}
