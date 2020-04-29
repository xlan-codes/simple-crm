import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";


@Entity()
export class Item {

    @ObjectIdColumn()
    Id: ObjectID;

    @Column()
    Name: string;

    @Column()
    Price: number;

    @Column()
    Quantity: number

    @Column()
    ItemType: number
}
