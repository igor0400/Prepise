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
import { User } from 'src/users/models/user.model';
import { DefaultQuestionInfo } from './default-question-info.model';
import { QuestionFile } from './question-file.model';
import { QuestionImg } from './question-img.model';

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
    type: DataType.STRING,
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

  @HasOne(() => DefaultQuestionInfo)
  defaultQuestionInfo: DefaultQuestionInfo;

  @HasMany(() => QuestionImg)
  imgs: QuestionImg[];

  @HasMany(() => QuestionFile)
  files: QuestionFile[];

  @BelongsTo(() => User)
  user: User;
}
