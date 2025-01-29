import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeOrmBaseEntity,
	UpdateDateColumn,
} from "typeorm";

export class BaseEntity extends TypeOrmBaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
