import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Job } from "./job.entity";
import { Employee } from "./employee.entity";


@Entity()
export class WorkingHour {

	@ObjectIdColumn()
	Id: ObjectID;

	@Column()
	StartHour: Date;

	@Column()
	EndHour: Date;

	@Column()
	Job: Job;

	@Column()
	Employee: Employee;

	@Column()
	Type: "CheckIn" |"CheckOut";

	
	@CreateDateColumn({ type: 'timestamp' })
	Registered: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
	Modifed: Date;
}
