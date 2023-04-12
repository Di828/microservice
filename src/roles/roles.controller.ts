import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {

    constructor(private roleService : RolesService){}

    @MessagePattern('createRole')
    login(@Payload() createRoleDto : CreateRoleDto){
      return this.roleService.createRole(createRoleDto);
    }
    
    @MessagePattern('getRoleDescription')
    getRoleByValue(@Payload() value : string ){
        return this.roleService.getRoleByValue(value);
    }
}
