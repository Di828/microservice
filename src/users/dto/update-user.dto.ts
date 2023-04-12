import { Role } from "src/roles/roles.model";

export class UpdateUserDto {
    user_id : number;
    login: string;
    email: string;
    password: string;
    roles : Role[];
}