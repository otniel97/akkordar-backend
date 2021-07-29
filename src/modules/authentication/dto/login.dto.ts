import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class LoginDto {
  
  @IsNotEmpty()
  @Length(5, 60)
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 60)
  password: string;
}
