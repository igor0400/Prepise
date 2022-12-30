import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { QuestionCommentReply } from './question-comment-reply.model';
import { Question } from './question.model';

interface QuestionCommentCreationArgs {
  questionId: number;
  authorId: number;
  text: string;
}

@Table({ tableName: 'QUESTIONS_COMMENTS' })
export class QuestionComment extends Model<
  QuestionComment,
  QuestionCommentCreationArgs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @HasMany(() => QuestionCommentReply)
  replies: QuestionCommentReply[];

  @BelongsTo(() => Question)
  question: Question;

  @BelongsTo(() => User)
  user: User;
}
