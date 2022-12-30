import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TestQuestionReply } from './test-question-reply.model';

interface TQRFCreationArgs {
  testQuestionReplyId: number;
  url: string;
}

@Table({ tableName: 'TEST_QUESTIONS_REPLIES_FILES' })
export class TestQuestionReplyFile extends Model<
  TestQuestionReplyFile,
  TQRFCreationArgs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => TestQuestionReply)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  testQuestionReplyId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @BelongsTo(() => TestQuestionReply)
  testQuestionReply: TestQuestionReply;
}
