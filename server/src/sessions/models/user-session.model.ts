import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

interface UserSessionCreationArgs {
  userId: number;
  userIp: string;
  userAgent: string;
}

@Table({ tableName: 'USERS_SESSIONS' })
export class UserSession extends Model<UserSession, UserSessionCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userIp: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userAgent: string;

  @Column({ type: DataType.DATE, allowNull: false })
  expires: Date;

  @BelongsTo(() => User)
  user: User;
}
