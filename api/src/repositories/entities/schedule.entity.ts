import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./employee.entity";
import { Job } from "./job.entity";
import { type } from "os";

@Entity()
export class Schedule {

	@ObjectIdColumn()
	Id: ObjectID;

	@Column()
	ScheduleSubject: string;

	@Column()
	StartHour: Date;


	@Column()
	EndHour: Date;

	@Column()
	Job: Job;
	
	@Column()
	Employee: Employee;
	
	@Column()
	Vehicle: string;

	@Column()
	TaskDescription: string;

	@Column()
	Inventory: any;

	@Column()
	Date: Date;

	@CreateDateColumn({ type: 'timestamp'})
	Created: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
	Modified: Date;



}
