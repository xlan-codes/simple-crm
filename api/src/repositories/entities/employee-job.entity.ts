import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class EmployeeJob {

	@ObjectIdColumn()
	Id: ObjectID;

	// @Column()
	// JobId: ObjectID;

	// @Column()
	// EmployeeId: ObjectID;
}
