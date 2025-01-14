import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Employee } from "./employee.entity";
import { Manager } from "./manager.entity";

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  @OneToOne(() => Manager, (manager) => manager.department) // Inverse side
  manager: Manager;
}
