import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException
} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from './dto/register.dto';
import { User } from '../../entities/user.entity';
import { PayLoad } from './jwt-payload.interface';
import { compare } from 'bcryptjs';
import { Gender } from "../../entities/gender.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
    private readonly jwtService: JwtService,
  ) { }


  async login(LoginDto: LoginDto) {
    const { username, password } = LoginDto;

    const userExists: User = await this.authRepository.findOne({
      where: [{ email: username }],
      relations: ['commune', 'gender']
    });


    if (!userExists) {
      throw new NotFoundException('Email or password invalid.');
    }

    const isMatch = await compare(password, userExists.password);

    if (!isMatch) {
      throw new NotFoundException('Email or password invalid.');
    }

    const payload: PayLoad = {
      username: userExists.email,
      uuid: userExists.uuid
    };

    const token = await this.jwtService.sign(payload);
    return Object.assign({
      access_token: token,
      decoded: payload
    });
  }

  async register(registerDto: RegisterDto): Promise<{ message: string, data: User }> {
    const { email } = registerDto;

    let userExists = await this.authRepository.findOne({
      where: [{ email: email }],
      relations: ['commune', 'gender']
    });

    if (userExists) {
      throw new ConflictException('Email has been token.')
    }

    const genderExists = await this.genderRepository.findOne(registerDto.genderId);

    if (!genderExists) {
      throw new NotFoundException('Gender does not exists.')
    }

    let userSaved = await registerDto.toUser();

    userSaved.gender = genderExists;

    await this.authRepository.save(userSaved);

    userExists = await this.authRepository.findOne({
      where: [{ email: userSaved.email }],
      relations: ['commune', 'gender']
    });

    return {
      message: 'User registered successfully.',
      data: userExists
    }


  }

}
