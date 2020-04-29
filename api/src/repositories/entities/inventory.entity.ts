import { Entity, ObjectIdColumn, ObjectID } from "typeorm";


@Entity()
export class Inventory {
    
    @ObjectIdColumn()
    Id: ObjectID;

    
}