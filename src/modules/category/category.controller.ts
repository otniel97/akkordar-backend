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
  UseGuards,
} from '@nestjs/common';
import { AkkordarAuthGuard } from '../authentication/akkordar-auth.guard';


@ApiTags('CATEGORY MODULE')
@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @UseGuards(AkkordarAuthGuard)
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  @UseGuards(AkkordarAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.getById(id);
  }

  @Post()
  @UseGuards(AkkordarAuthGuard)
  async save(@Body() dto: CreateCategoryDto): Promise<any> {
    return await this.categoryService.save(dto);
  }

  @Put(':id')
  @UseGuards(AkkordarAuthGuard)
  async updateById(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateById(id, dto)
  }

  @Delete(':id')
  @UseGuards(AkkordarAuthGuard)
  async delete(@Param('id') id: number) {
    return this.categoryService.deleteById(id)
  }
}
