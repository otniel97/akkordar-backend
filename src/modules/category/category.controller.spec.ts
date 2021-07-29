import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { configService } from '../../config/config.service';
import { CategoryController } from './category.controller';
import { getConnection } from 'typeorm';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([Category]),
      ],
      controllers: [CategoryController],
      providers: [CategoryService]
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  afterAll(done => {
    const connection = getConnection('default');
    connection.close()
    done();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
