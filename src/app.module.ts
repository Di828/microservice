import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles-model';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: 'postgres',
    password: '123123',
    database: process.env.POSTGRES_DB,
    models: [User, Role, UserRoles],
    autoLoadModels: true
  }),
  UsersModule,  
  RolesModule,
  AuthModule,],
  controllers: [AuthController, UsersController],
  providers: [],
})
export class AppModule {}
