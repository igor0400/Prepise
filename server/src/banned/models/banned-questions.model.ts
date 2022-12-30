import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from 'src/questions/models/question.model';

interface BanQuestionCreationArgs {
  questionId: number;
  banReason: string;
}

@Table({ tableName: 'BANNED_QUESTIONS' })
export class BanQuestion extends Model<BanQuestion, BanQuestionCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Question)
  @Column({ type: DataType.NUMBER, allowNull: false })
  questionId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  banReason: string;

  @BelongsTo(() => Question)
  question: Question;
}
