import { Column, ObjectID, ObjectIdColumn } from "typeorm";

export class PriceRate {
	@ObjectIdColumn()
	Id: ObjectID;

	@Column()
	NormalBusinessHour: number;

	@Column()
	AfterBusinessHour: number;


	@Column()
	Employee: string;

}
