import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from '../../../entities/gender.entity';
import { Repository } from 'typeorm';
import { genders } from './data';

/**
 * Service dealing with language based operations.
 *
 * @class
 */
@Injectable()
export class GenderSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<Gender>} GenderRepository
     */
    constructor(
        @InjectRepository(Gender)
        private readonly genderRepository: Repository<Gender>,
    ) { }
    /**
     * Seed all Widgets.
     *
     * @function
     */
    create(): Array<Promise<Gender>> {
        return genders.map(async (Gender: any) => {
            return await this.genderRepository
                .findOne({ name: Gender.name })
                .then(async (GenderFind) => {
                    // We check if a Gender already exists.
                    // If it does don't create a new one.
                    if (GenderFind) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(await this.genderRepository.save(Gender));
                })
                .catch((error) => Promise.reject(error));
        });
    }
}
