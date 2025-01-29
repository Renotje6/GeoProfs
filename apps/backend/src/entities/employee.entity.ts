import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Department } from './department.entity';
import { SickReport } from './sickReport.entity';
import { User } from './user.entity';

@Entity()
export class Employee extends BaseEntity {
	@OneToOne(() => User, { cascade: true, eager: true })
	@JoinColumn()
	user: User;

	@Column({ default: 0 })
	balance: number;

	@ManyToOne(() => Department, { eager: true })
	@JoinColumn({ name: 'departmentId' })
	department: Department;

	@OneToMany(() => SickReport, (sickReport) => sickReport.employee)
	sickReports: SickReport[];
}
