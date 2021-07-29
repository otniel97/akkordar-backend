import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { initSwagger } from './app.swagger';
import dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(`/api/${process.env.VERSION}`);
  initSwagger(app);
  await app.listen(process.env.PORT);
  logger.log(`Server is running in port ${process.env.PORT}`)
}
bootstrap();
