import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
import { Question } from './question.model';

interface QUUICreationArgs {
  questionId: number;
  userId: number;
  view?: boolean;
  done?: boolean;
}

@Table({ tableName: 'QUESTION_USED_USER_INFO' })
export class QuestionUsedUserInfo extends Model<
  QuestionUsedUserInfo,
  QUUICreationArgs
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
  userId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  view: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  done: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Question)
  question: User;
}
