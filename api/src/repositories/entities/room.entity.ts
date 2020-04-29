import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Employee } from "./employee.entity";
import { Message } from "./message.entity";
import {
	IsNotEmpty, IsBoolean, IsArray,

} from 'class-validator';

@Entity()
export class Room {

    @ObjectIdColumn()
    Id: ObjectID;
    
    // @Column()
    // Name: string;

    @Column()
    @IsNotEmpty()
    RoomCode: string;
    
    @Column()
    description: string;
    
    @Column()
    IsUser: Boolean;

    @Column()
    @IsBoolean()
    IsPrivate: Boolean;
    
    @ManyToMany(type=>Employee)
    // @JoinTable()
    Users: Array<Employee>;

    @Column()
    @IsArray()
    Messages: Array<Message>;

    
	@CreateDateColumn({ type: 'timestamp'})
	Created: Date;

	@UpdateDateColumn({ type: 'timestamp', nullable: true  })
    Modified: Date;

}