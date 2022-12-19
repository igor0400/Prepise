import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

interface UserSessionCreationArgs {
  user_id: number;
  user_ip: string;
  user_agent: string;
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
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_ip: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_agent: string;
}
