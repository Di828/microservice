import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddRoleDto } from './dto/add-role.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

    constructor(private usersService : UsersService){}

    @MessagePattern('getUsers')
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    
    @MessagePattern('getUserById')
    getUserById(@Payload() id : number) {        
        return this.usersService.getUserById(id);
    }
    
    @MessagePattern('setRole')
    addRole(@Payload() addRoleDto : AddRoleDto){
        return this.usersService.addRole(addRoleDto);
    }
    
    @MessagePattern('deleteUser')
    deleteUserById(@Payload() id : number) {        
        return this.usersService.deleteUserById(id);
    }  
      
}
