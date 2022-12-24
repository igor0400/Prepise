import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { BanUser } from 'src/banned/models/banned-users.model';
import { Role } from 'src/roles/models/roles.model';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { UserSession } from '../../sessions/models/user-session.model';
import { UserInfo } from './users-info.model';

interface UserCreationArgs {
  name: string;
  password: string;
  email: string;
  emailVerify: boolean;
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
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  emailVerify: boolean;

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
    defaultValue: 0,
  })
  followers: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likes: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  dislikes: number;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @HasMany(() => UserSession)
  sessions: UserSession[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => BanUser)
  banned: BanUser;

  @HasOne(() => UserInfo)
  userInfo: UserInfo;
}
