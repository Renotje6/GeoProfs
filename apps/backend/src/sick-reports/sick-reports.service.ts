import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SickReport } from '../entities/sickReport.entity';
import { User } from '../entities/user.entity';
import { UpdateSickReportDto } from './dto/update-sick-report.dto';

@Injectable()
export class SickReportsService {
  constructor(
    @InjectRepository(SickReport) private sickReportRepository: Repository<SickReport>,
  ) {}

  create(user: User) {

    
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
