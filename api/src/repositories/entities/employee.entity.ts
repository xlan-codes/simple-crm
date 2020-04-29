import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, Timestamp, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Employee {

	@ObjectIdColumn()
	Id: ObjectID;

	@Column()
	FirstName: string;

	@Column()
	LastName: string;

	@Column()
	Email: string;

	@Column()
	Birthdate: Date;

	@Column()
	Gender: string;

	@CreateDateColumn({ type: 'timestamp' })
	Registered: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
	Modifed: Date;

	@Column()
	Position: string;

	@Column()
	NormalBusinessHour: string;

	@Column()
	AfterBusinessHour: string;
	
	@Column()
	Address: string;
	
	@Column()
	Username: string;

	@Column()
	Password: string;

	@OneToMany(()=>Message, message => message.User)
	@JoinColumn()
	Messages: Array<Message>;
}
