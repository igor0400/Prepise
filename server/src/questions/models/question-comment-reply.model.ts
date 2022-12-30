import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { QuestionComment } from './question-comment.model';

interface QuestionCommentReplyCreationArgs {
  questionCommentId: number;
  authorId: number;
  text: string;
}

@Table({ tableName: 'QUESTIONS_COMMENTS_REPLIES' })
export class QuestionCommentReply extends Model<
  QuestionCommentReply,
  QuestionCommentReplyCreationArgs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => QuestionComment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionCommentId: number;

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

  @BelongsTo(() => QuestionComment)
  questionComment: QuestionComment;

  @BelongsTo(() => User)
  user: User;
}
