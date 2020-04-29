import { Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Country {

	@ObjectIdColumn()
	Id: ObjectID;

	@ObjectIdColumn()
	Name: ObjectID;


}
