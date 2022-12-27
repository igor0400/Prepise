import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSession } from './models/user-session.model';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsService],
  imports: [SequelizeModule.forFeature([UserSession])],
  exports: [SessionsService],
})
export class SessionsModule {}
