import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { UserSession } from './user-session.model';

interface UserCreationArgs {
  name: string;
  email: string;
  email_verify: boolean;
  gender: 'male' | 'female';
  avatar: string;
}

@Table({ tableName: 'USERS' })
export class User extends Model<User, UserCreationArgs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  email_verify: boolean;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar: string;

  @Column({
    type: DataType.INTEGER,
  })
  followers: number;

  @Column({
    type: DataType.INTEGER,
  })
  likes: number;

  @Column({
    type: DataType.INTEGER,
  })
  dislikes: number;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.ENUM('male', 'female'),
    allowNull: false,
  })
  gender: 'male' | 'female';

  @HasMany(() => UserSession)
  sessions: UserSession[];
}
