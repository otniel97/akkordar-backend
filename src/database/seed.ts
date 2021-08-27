import { NestFactory } from "@nestjs/core";
import { Seeder } from "./seeders/seeder";
import { SeederModule } from "./seeders/seed.module";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(appContext => {
            const seeder = appContext.get(Seeder);
            seeder
                .seed()
                .then(() => {
                    console.log('Seeding complete!');
                    process.exit(0);
                })
                .catch(error => {
                    console.log('Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();