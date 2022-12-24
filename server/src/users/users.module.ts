import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { BanUser } from 'src/banned/models/banned-users.model';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { User } from './models/user.model';
import { UserInfo } from './models/users-info.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, BanUser, UserInfo]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
