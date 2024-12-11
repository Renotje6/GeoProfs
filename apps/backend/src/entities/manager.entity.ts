import { Column, Entity } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Manager extends User {
    @Column()
    department: string;
}