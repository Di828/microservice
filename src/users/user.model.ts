import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript"
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles-model";

interface UserCreationAttr {
    login : string;
    email : string;
    password : string;
}

@Table({tableName : 'users'})
export class User extends Model<User, UserCreationAttr>{
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey: true})
    user_id : number;

    @Column({type : DataType.STRING, unique : true, allowNull : false})
    login : string;

    @Column({type : DataType.STRING, unique : true, allowNull : false})
    email : string;

    @Column({type : DataType.STRING, allowNull : false})
    password : string;    

    @Column({type : DataType.BOOLEAN, defaultValue : true})
    isActive : boolean

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
 
}