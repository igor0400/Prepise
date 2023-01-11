import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

interface BanUserCreationArgs {
  userId: number;
  banReason: string;
}

@Table({ tableName: 'BANNED_USERS' })
export class BanUser extends Model<BanUser, BanUserCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  banReason: string;

  @BelongsTo(() => User)
  user: User;
}
