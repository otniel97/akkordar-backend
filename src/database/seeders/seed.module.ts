import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { GenderSeederModule } from './genders/gender.module';
import { Seeder } from './seeder';

@Module({
    imports: [DatabaseModule, GenderSeederModule],
    providers: [Seeder],
})
export class SeederModule { }