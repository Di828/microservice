import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { UserRoles } from "./user-roles-model";

interface RoleCreationAttr {
    value: string;
    description : string;
}

@Table({tableName : 'roles', createdAt : false, updatedAt : false})
export class Role extends Model<Role, RoleCreationAttr>{
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey: true})
    role_id : number;

    @Column({type : DataType.STRING, unique : true, allowNull : false})
    value : string;

    @Column({type : DataType.STRING, allowNull : false})
    description : string;

    // Связь многие ко многим, к чему, через что.
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}