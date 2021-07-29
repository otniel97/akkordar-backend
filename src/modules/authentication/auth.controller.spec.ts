import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../../entities/user.entity";
import { PassportModule } from '@nestjs/passport';
import { configService } from '../../config/config.service';
import { AuthModule } from './auth.module';
import { Gender } from '../../entities/gender.entity';
import { getConnection } from 'typeorm';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User, Gender]),
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
          useFactory() {
            return {
              secret: jwtConstants.secret,
              signOptions: { expiresIn: "2h" }
            }
          }
        }),
        AuthModule
      ],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(done => {
    const connection = getConnection('default');
    connection.close()
    done();
  });

  it('should be defined', () => {

    expect(controller).toBeDefined();

  });

  describe('Authorization', () => {

  })

});
