import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { User } from '../users/models/user.model';
import { UserRoles } from './models/user-roles.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '5m',
      },
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [RolesService, JwtModule],
})
export class RolesModule {}
