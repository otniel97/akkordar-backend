import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryService } from './category.service';
import { Category } from '../../entities/category.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';


@ApiTags('CATEGORY MODULE')
@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService){}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Post()
  async save(@Body() dto: CreateCategoryDto): Promise<any> {
    return await this.categoryService.save(dto);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateById(id, dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoryService.deleteById(id)
  }
}
