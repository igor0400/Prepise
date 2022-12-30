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
import { TestQuestionInfo } from './test-question-info.model';
import { TestQuestionReplyFile } from './test-question-reply-file.model';

interface TQRCreationArgs {
  testQuestionInfoId: number;
  authorId: number;
  text: string;
}

@Table({ tableName: 'TEST_QUESTIONS_REPLIES' })
export class TestQuestionReply extends Model<
  TestQuestionReply,
  TQRCreationArgs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => TestQuestionInfo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  testQuestionInfoId: number;

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

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  accepted: boolean;

  @HasMany(() => TestQuestionReplyFile)
  files: TestQuestionReplyFile[];

  @BelongsTo(() => TestQuestionInfo)
  testQuestionInfo: TestQuestionInfo;
}
