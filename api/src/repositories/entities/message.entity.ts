import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Employee } from "./employee.entity";
import { IsNotEmpty } from "class-validator";


@Entity()
export class Message {

    @ObjectIdColumn()
    public Id: ObjectID;

    @Column()
    @IsNotEmpty()
    public Message: string;

    @Column()
    public User: string;

    // @ManyToOne(() => Employee, employee=>employee.Messages)
    // public User: ObjectID;

    
	@CreateDateColumn({ type: 'timestamp'})
	public Created: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
    public Modified: Date;
}
