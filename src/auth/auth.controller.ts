import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/regestration.dto';

@Controller()
export class AuthController {  
  
  constructor(private authService : AuthService){}

  @MessagePattern('login')
  login(@Payload() loginDto : LoginDto){
      return this.authService.login(loginDto);
  }

  @MessagePattern('registration')
  registration(@Payload() registrationDto : RegistrationDto){                
      return this.authService.registration(registrationDto);
  }

  @MessagePattern('adminRegistration')
  adminRegistration(@Payload() registrationDto : RegistrationDto){                
      return this.authService.registration(registrationDto, true);
  }
  
  @MessagePattern('update')  
  updateUserById(@Payload() updateDto) {              
      return this.authService.updateUserById(updateDto.id, updateDto);
  }
}