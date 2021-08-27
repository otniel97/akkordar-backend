import { Injectable } from '@nestjs/common';
import { GenderSeederService } from './genders/gender.service';

@Injectable()
export class Seeder {
    constructor(
        private readonly genderSeeder: GenderSeederService
    ) { }

    async seed() {
        await this.genders()
            .then((completed) => {
                console.log('Successfuly completed seeding genders...');
                Promise.resolve(completed);
            })
            .catch((error) => {
                console.log('Failed seeding genders...');
                Promise.reject(error);
            });

    }

    async genders() {
        return await Promise.all(this.genderSeeder.create())
            .then((createdGenderS) => {
                // Can also use this.logger.verbose('...');
                console.log(
                    'No. of genders created : ' +
                    // Remove all null values and return only created Genders.
                    createdGenderS.filter(
                        (nullValueOrCreatedGender) => nullValueOrCreatedGender,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch((error) => Promise.reject(error));
    }


}
