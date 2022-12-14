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
import { SessionsModule } from './sessions/sessions.module';
import { BannedModule } from './banned/banned.module';
import { BanUser } from './banned/models/banned-users.model';
import { AuthModule } from './auth/auth.module';
import { UserInfo } from './users/models/users-info.model';
import { EmailModule } from './email/email.module';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/models/question.model';
import { QuestionImg } from './questions/models/question-img.model';
import { QuestionFile } from './questions/models/question-file.model';
import { DefaultQuestionInfo } from './questions/models/default-question-info.model';
import { BanQuestion } from './banned/models/banned-questions.model';
import { QuestionUsedUserInfo } from './questions/models/question-used-user-info.model';
import { TestQuestionInfo } from './questions/models/test-question-info.model';
import { TestQuestionReplyFile } from './questions/models/test-question-reply-file.model';
import { TestQuestionReply } from './questions/models/test-question-reply.model';
import { QuestionComment } from './questions/models/question-comment.model';
import { QuestionCommentReply } from './questions/models/question-comment-reply.model';
import { FilesModule } from './files/files.module';

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
      models: [
        User,
        UserSession,
        UserRoles,
        Role,
        BanUser,
        UserInfo,
        Question,
        QuestionImg,
        QuestionFile,
        DefaultQuestionInfo,
        BanQuestion,
        QuestionUsedUserInfo,
        TestQuestionInfo,
        TestQuestionReply,
        TestQuestionReplyFile,
        QuestionComment,
        QuestionCommentReply,
      ],
    }),
    UsersModule,
    RolesModule,
    SessionsModule,
    BannedModule,
    AuthModule,
    EmailModule,
    QuestionsModule,
    FilesModule,
  ],
})
export class AppModule {}
