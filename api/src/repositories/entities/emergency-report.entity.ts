
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Job } from "./job.entity";
import { Employee } from "./employee.entity";

@Entity()
export class EmergencyReport {

	@ObjectIdColumn()
	Id: ObjectID;


	@Column()
	Job: Job;

	@Column()
	Employee: Employee;
}
