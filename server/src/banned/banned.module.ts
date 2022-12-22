import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { BannedController } from './banned.controller';
import { BannedService } from './banned.service';
import { BanUser } from './models/banned-users.model';

@Module({
  controllers: [BannedController],
  providers: [BannedService],
  imports: [SequelizeModule.forFeature([BanUser, User])],
})
export class BannedModule {}
