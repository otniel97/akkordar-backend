import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Gender } from '../../../entities/gender.entity'
import { GenderSeederService } from './gender.service';

@Module({
    imports: [TypeOrmModule.forFeature([Gender])],
    providers: [GenderSeederService],
    exports: [GenderSeederService],
})
export class GenderSeederModule { }
