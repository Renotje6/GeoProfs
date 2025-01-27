import { Injectable } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Injectable()
export class LeaveRequestsService {
  create(createLeaveRequestDto: CreateLeaveRequestDto) {
    return 'This action adds a new leaveRequest';
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
