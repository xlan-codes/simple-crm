import { ObjectIdColumn, ObjectID, Column, Entity } from "typeorm";

@Entity()
export class Equipment {
    
    @ObjectIdColumn()
    Id: ObjectID;

    @Column()
    Name: String;

    Type: String;

    @Column()
    Code: String;

}
