export class CreateUserDto {
  readonly name: string;
  readonly password: string;
  readonly email: string;
  readonly emailVerify: boolean;
  readonly gender?: 'female' | 'male';
}
