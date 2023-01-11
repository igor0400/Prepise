import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { BanQuestion } from 'src/banned/models/banned-questions.model';
import { User } from 'src/users/models/user.model';
import { DefaultQuestionInfo } from './default-question-info.model';
import { QuestionComment } from './question-comment.model';
import { QuestionFile } from './question-file.model';
import { QuestionImg } from './question-img.model';
import { QuestionUsedUserInfo } from './question-used-user-info.model';
import { TestQuestionInfo } from './test-question-info.model';

interface QuestionCreationArgs {
  authorId: number;
  title: string;
  description: string;
  commented?: boolean;
  interviewPosition?: boolean;
}

@Table({ tableName: 'QUESTIONS' })
export class Question extends Model<Question, QuestionCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  commented: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  interviewPosition: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likes: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  dislikes: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  viewes: number;

  @HasOne(() => DefaultQuestionInfo)
  defaultQuestionInfo: DefaultQuestionInfo;

  @HasOne(() => TestQuestionInfo)
  testQuestionInfo: TestQuestionInfo;

  @HasMany(() => QuestionImg)
  imgs: QuestionImg[];

  @HasMany(() => QuestionFile)
  files: QuestionFile[];

  @HasOne(() => BanQuestion)
  banned: BanQuestion;

  @HasMany(() => QuestionUsedUserInfo)
  usedUserInfo: QuestionUsedUserInfo[];

  @HasMany(() => QuestionComment)
  comments: QuestionComment[];

  @BelongsTo(() => User)
  user: User;
}
