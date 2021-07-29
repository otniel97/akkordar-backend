import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './modules/authentication/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
