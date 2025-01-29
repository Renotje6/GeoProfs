import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { Manager } from '../entities/manager.entity';
import { SickReport } from '../entities/sickReport.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class SickReportsService {
	constructor(
		@InjectRepository(SickReport) private sickReportRepository: Repository<SickReport>,
		@InjectRepository(Manager) private managerRepository: Repository<Manager>,
		@InjectRepository(Employee) private employeeRepository: Repository<Employee>
	) {}

	async create(user: User) {
		const employee = await this.employeeRepository.createQueryBuilder().where('employee.userId = :employeeId', { employeeId: user.id }).getOne();

		if (!employee) {
			throw new Error('Employee not found');
		}

		return await this.sickReportRepository.save(
			this.sickReportRepository.create({
				employee,
				startDate: new Date(),
			})
		);
	}

	findAll() {
		this.sickReportRepository.find();
	}

	async findAllManager(user: User) {
		const manager = await this.managerRepository.createQueryBuilder('manager').leftJoinAndSelect('manager.department', 'department').where('manager.userId = :managerId', { managerId: user.id }).getOne();

		if (!manager?.department) {
			throw new Error('Manager department not found');
		}

		const employees = await this.employeeRepository.createQueryBuilder('employee').where('employee.departmentId = :departmentId', { departmentId: manager.department.id }).getMany();
		// Get all current sick reports for the employees in the employees array
		return await this.sickReportRepository.find({ where: { employee: In(employees.map((employee) => employee.id)), endDate: IsNull() } });
	}

	async findMine(user: User) {
		const employee = await this.employeeRepository.createQueryBuilder().where('employee.userId = :employeeId', { employeeId: user.id }).getOne();

		if (!employee) {
			throw new Error('Employee not found');
		}

		return this.sickReportRepository.createQueryBuilder('sickReport').where('sickReport.employeeId = :employeeId', { employeeId: employee.id }).getMany();
	}

	findOne(id: string) {
		return this.sickReportRepository.findOne({ where: { id } });
	}

	update(id: string, updateSickReportDto: Partial<SickReport>) {
		this.sickReportRepository.update(id, updateSickReportDto);
	}

	async userHasActiveSickReport(user: User) {
		const employee = await this.employeeRepository.createQueryBuilder().where('employee.userId = :employeeId', { employeeId: user.id }).getOne();
		const sickReport = await this.sickReportRepository.createQueryBuilder('sickReport').where('sickReport.employeeId = :employeeId', { employeeId: employee.id }).andWhere('sickReport.endDate IS NULL').getCount();

		return sickReport > 0;
	}
}
