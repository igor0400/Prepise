import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from './question.model';

interface DQICreationArgs {
  questionId: number;
  interviewCompany?: string;
}

@Table({ tableName: 'DEFAULT_QUESTION_INFO' })
export class DefaultQuestionInfo extends Model<
  DefaultQuestionInfo,
  DQICreationArgs
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  interviewCompany: string;

  @BelongsTo(() => Question)
  question: Question;
}
