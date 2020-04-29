import { ObjectIdColumn, ObjectID, Column, Entity, CreateDateColumn } from "typeorm";

@Entity()
export class EquipmentLocation {

    @ObjectIdColumn()
    Id: ObjectID

    @Column()
    Equipment: string;

    @Column()
    Employe: string;

    @Column()
    Location: string;
    
    @Column()
    Status: Boolean;
    
    @CreateDateColumn()
    Date: Date;

}
