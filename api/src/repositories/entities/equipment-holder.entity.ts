import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn } from "typeorm";

@Entity()
export class EquipmnetHolder {

    
    @ObjectIdColumn()
    Id: ObjectID;

    @Column()
    Equipment: string;

    @Column()
    Employee: string;

    @Column()
    Status: Boolean;

    @CreateDateColumn()
    Date: Date;

    
}
