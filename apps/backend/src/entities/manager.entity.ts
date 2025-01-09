import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Department } from "./department.entity";
import { User } from "./user.entity";

@Entity()
export class Manager {
  @PrimaryColumn()
  @OneToOne(() => User, (user) => user.id, { eager: true, cascade: true })
  @JoinColumn({ name: "id" }) // This will act as the primary key and foreign key
  id: string;

  @OneToOne(() => Department, (department) => department.manager) // Owning side
  @JoinColumn() // This defines the foreign key column
  department: Department;
}
