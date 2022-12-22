import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UserSession } from './sessions/models/user-session.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/models/user-roles.model';
import { Role } from './roles/models/roles.model';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsModule } from './sessions/sessions.module';
import { BannedModule } from './banned/banned.module';
import { BanUser } from './banned/models/banned-users.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      models: [User, UserSession, UserRoles, Role, BanUser],
    }),
    UsersModule,
    RolesModule,
    SessionsModule,
    BannedModule,
    AuthModule,
  ],
  controllers: [SessionsController],
})
export class AppModule {}
