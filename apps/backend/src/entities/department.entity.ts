import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./employee.entity";
import { Manager } from "./manager.entity";

@Entity()
export class Department {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  @OneToOne(() => Manager, (manager) => manager.department) // Inverse side
  manager: Manager;
}
