import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Manager } from '../entities/manager.entity';
import { SickReport } from '../entities/sickReport.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class SickReportsService {
  constructor(
    @InjectRepository(SickReport) private sickReportRepository: Repository<SickReport>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  ) {}

  async create(user: User) {
    return await this.sickReportRepository.save(this.sickReportRepository.create({
      user,
      startDate: new Date(),
    }));
  }

  findAll() {
   this.sickReportRepository.find();
  }

  async findAllManager(user: User) {
    const manager = await this.managerRepository.findOne({where:{user}});
    const employees = await this.employeeRepository.find({where:{department: manager.department}});

    // Get all current sick reports for the employees in the employees array
    return this.sickReportRepository.find({where:{user: In(employees.map(employee => employee.user))}});
  }

  async findMine(user: User) {
    return this.sickReportRepository.createQueryBuilder("sick_report")
    .where('sickReport.userId = :userId', {userId:user.id});
  }

  findOne(id: string) {
    return this.sickReportRepository.findOne({where:{ id}});
  }

  update(id: string, updateSickReportDto: Partial<SickReport>) {
    this.sickReportRepository.update(id, updateSickReportDto);
  }

  remove(id: number) {
    return `This action removes a #${id} sickReport`;
  }

  async userHasActiveSickReport(user: User) {
    const sickReport = await
    this.sickReportRepository.createQueryBuilder('sickReport')
    .where('sickReport.userId = :userId', {userId:user.id})
    .andWhere('sickReport.endDate IS NULL')
    .getCount()

return sickReport > 0;
}
}
