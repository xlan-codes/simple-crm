import { ObjectIdColumn, ObjectID, Column, Entity, CreateDateColumn } from "typeorm";

@Entity()
export class VehicleHolder {

    @ObjectIdColumn()
    Id: ObjectID

    @Column()
    Vehicle: string;

    @Column()
    Location: string;

    
    @Column()
    Status: Boolean;

    
    @CreateDateColumn()
    Date: Date;

}
