import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    //Инжектим модель взаимодействия с базой данных
    constructor(@InjectModel(User) private userRepository : typeof User,
                private roleService : RolesService){}

    async getAllUsers() {
        const users = await this.userRepository.findAll({include : {all : true}});
        return users;
    }

    async getUserById(user_id : number){        
        const user = await this.userRepository.findOne({where : {user_id}, include : {all : true}});
        return user;
    }

    async createUser(createUserDto : CreateUserDto){
        let role = await this.roleService.getRoleByValue('USER');
        if (!role){
            await this.roleService.createRole({value : 'USER', description : 'default user'});
        }

        role = await this.roleService.getRoleByValue('USER');
        const user = await this.userRepository.create(createUserDto);                   
        await user.$set('roles', [role.role_id]);   
        user.roles = [role];
        return user;
    }

    async getUserByLoginOrEmail(login : string, email : string){
        const user = this.userRepository.findOne({ where : { [Op.or]: [{login : login}, {email : email}] }, include : {all : true} })
        return user;
    }

    async getUserByLogin(login : string){
        const user = this.userRepository.findOne({ where : { login : login} });
        return user;
    }

    async getUserByEmail(email : string){
        const user = this.userRepository.findOne({ where : { email : email} });
        return user;
    }

    async addRole(addRoleDto : AddRoleDto){
        const user = await this.userRepository.findByPk(addRoleDto.userId);
        const role = await this.roleService.getRoleByValue(addRoleDto.value);        
        if (role && user){            
            await user.$add('role', role.role_id);   
            return {message : 'success'};
        }

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async deleteUserById(user_id : number){
        await this.userRepository.destroy({where : {user_id}});
    }
}
