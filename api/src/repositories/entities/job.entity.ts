import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Job {

	@ObjectIdColumn()
	Id: ObjectID;

	@Column()
	JobNumber: string;

	@Column()
	JobDescription: string;

	@Column()
	JobType: string;

	@Column()
	JobAddress: string;

	@Column()
	JobContact: string;

	@Column()
	JobStatus: string;

	@CreateDateColumn({ type: 'timestamp'})
	Created: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
	Modified: Date;


}
