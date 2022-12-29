import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from './question.model';

interface QuestionImgCreationArgs {
  questionId: number;
  url: string;
}

@Table({ tableName: 'QUESTIONS_IMGS' })
export class QuestionImg extends Model<QuestionImg, QuestionImgCreationArgs> {
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
    allowNull: false,
  })
  url: string;

  @BelongsTo(() => Question)
  question: Question;
}
