import { Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class State {

	@ObjectIdColumn()
	Id: ObjectID;

	Name: string;

}

