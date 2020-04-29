import {Column, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn, CreateDateColumn} from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Location {

	@ObjectIdColumn()
	Id: ObjectID;


	@Column()
	Lat: string;

	Lng: string;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
	Timestamp: Date;

	@Column()
	Employee: Employee;

	
	@CreateDateColumn({ type: 'timestamp'})
	Created: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
	Modified: Date;

}
