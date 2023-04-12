import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';
import { UserRoles } from '../roles/user-roles-model';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],

  // Не забываем заипортить все использованные в сервисах модели данных
  imports : [
    RolesModule, 
    SequelizeModule.forFeature([User, Role, UserRoles]),
    forwardRef(() => AuthModule) 
  ],

  // Экспортируем юзер сервис, т.к. будем использовать его в сервисе авторизации
  exports : [ UsersService ]
})
export class UsersModule {

}
