
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";


@Entity()
export class Vehicle {

	@ObjectIdColumn()
	Id: ObjectID;


	@Column()
	Name: String;

    @Column()
    Type: String;

    @Column()
    Targa: String;

    @Column()
    VehicleCode: String;
    
	@Column()
	Inventory: any;
}
