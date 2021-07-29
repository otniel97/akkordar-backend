import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
