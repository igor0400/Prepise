import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

interface UserInfoCreationArgs {
  userId: number;
  gender: 'male' | 'female';
}

@Table({ tableName: 'ONLY_USERS_INFO' })
export class UserInfo extends Model<UserInfo, UserInfoCreationArgs> {
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
    type: DataType.ENUM('male', 'female'),
    allowNull: false,
  })
  gender: 'male' | 'female';

  @BelongsTo(() => User)
  user: User;
}
