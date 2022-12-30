import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Question } from './question.model';
import { TestQuestionReply } from './test-question-reply.model';

interface TQICreationArgs {
  questionId: number;
}

@Table({ tableName: 'TEST_QUESTIONS_INFO' })
export class TestQuestionInfo extends Model<TestQuestionInfo, TQICreationArgs> {
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

  @HasMany(() => TestQuestionReply)
  replies: TestQuestionReply[];

  @BelongsTo(() => Question)
  question: Question;
}
