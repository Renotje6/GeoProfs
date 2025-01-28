import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Employee } from 'src/entities/employee.entity';
import { LeaveRequest } from 'src/entities/leave-request.entity';
import { Manager } from 'src/entities/manager.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest) private leaveRequestRepository: Repository<LeaveRequest>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    @InjectRepository(Department) private departmentRepository: Repository<Department>
  ){}

  async create(createLeaveRequestDto: CreateLeaveRequestDto, user: User) {
    const employee = await this.employeeRepository.createQueryBuilder().where('employee.userId = :employeeId', { employeeId: user.id }).getOne();

    if (!employee) {
      throw new Error('Employee not found');
    }
    
    // Get the total number of days the employee has requested off from the createLeaveRequestDto
    const totalDays = Math.abs(createLeaveRequestDto.endDate.getDate() - createLeaveRequestDto.startDate.getDate()) || 1;
    console.log(totalDays, employee.balance)
    // Check if the employee has enough days off left
    if (employee.balance < totalDays) {
      throw new Error('Employee does not have enough days off left');
    }

    // Update the employee's balance
    employee.balance -= totalDays;
    await this.employeeRepository.save(employee);

    const leaveRequest =  await this.leaveRequestRepository.save(
      this.leaveRequestRepository.create({
        employee,
        ...createLeaveRequestDto
      })
    );

    return leaveRequest;
  }

  findAll() {
    return `This action returns all leaveRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaveRequest`;
  }

  update(id: number, updateLeaveRequestDto: UpdateLeaveRequestDto) {
    return `This action updates a #${id} leaveRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveRequest`;
  }
}
