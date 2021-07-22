import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne(id);
        if(!category) throw new NotFoundException('Category does not exist');
        return category;
    }

    async save(dto: CreateCategoryDto): Promise<any> {
        const category = this.categoryRepository.create(dto as any);
        return await this.categoryRepository.save(category);
     }

    async updateById(id: number, dto: UpdateCategoryDto) {
        const category = await this.categoryRepository.findOne(id);
        if(!category) throw new NotFoundException('Category does not exist');
        const updatedCategory = Object.assign(category, dto);
        return await this.categoryRepository.save(updatedCategory);
    }

    async deleteById(id: number) {
        const category = await this.categoryRepository.findOne(id);
        if(!category) throw new NotFoundException('Category does not exist');
        return await this.categoryRepository.delete(id);
    }
}
