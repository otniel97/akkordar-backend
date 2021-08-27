import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { User } from '../../../entities/user.entity';
import { Match } from '../ownDecorators/match.decorator';
import { genSalt, hash } from 'bcryptjs';

export class RegisterDto {

  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', {
    message: 'Password and confirm password must be equal.'
  })
  public confirmPassword: string;

  @IsNotEmpty()
  @IsNumber()
  public communeId: number;

  @IsNotEmpty()
  @IsNumber()
  public genderId: number;

  public async toUser(): Promise<User> {

    const user: User = new User();
    const salt = await genSalt(10);
    user.username = this.username;
    user.email = this.email;
    user.password = await hash(this.password, salt);
    return user;

  }

}
