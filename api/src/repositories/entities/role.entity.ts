import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Role {

    @ObjectIdColumn()
    Id: ObjectID;

    @Column()
    RoleCode: String;

    @Column()
    RoleName: string;
}
