import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "src/entities/department.entity";
import { Employee } from "src/entities/employee.entity";
import { User, UserRole } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }

  findOne(id: string): Promise<Employee> {
    return this.employeesRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<Employee | null> {
    return this.employeesRepository
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.user", "user") // Join the `User` entity
      .leftJoinAndSelect("employee.department", "department") // Join the `Department` entity (if needed)
      .where("user.email = :email", { email }) // Filter by `User.email`
      .getOne(); // Get the single result
  }

  async insert(employee: {
    email: string;
    password: string;
    avatar: string;
    name: string;
    departmentId: string;
  }): Promise<Employee> {
    if (await this.findByEmail(employee.email)) {
      throw new Error("Employee already exists");
    }

    const department = await this.departmentRepository.findOne({
      where: { id: employee.departmentId },
    });

    if (!department) {
      throw new Error("Department not found");
    }

    const newUser = await this.userRepository.save(
      this.userRepository.create({ ...employee, role: UserRole.EMPLOYEE }),
    );

    return this.employeesRepository.save(
      this.employeesRepository.create({
        id: newUser.id,
        department,
        balance: 0,
      }),
    );
  }
}
