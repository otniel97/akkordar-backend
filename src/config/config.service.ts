import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnviromentConfig } from './config'
import * as dotenv from 'dotenv'
dotenv.config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  public getValue(key: string, throwOnMissing = true): string {

    const mode = process.env.MODE

    const config = getEnviromentConfig(mode);

    const value = config[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    return process.env.MODE != 'DEVELOPMENT';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('MYSQL_HOST'),
      port: parseInt(this.getValue('MYSQL_PORT')),
      username: this.getValue('MYSQL_USER'),
      password: this.getValue('MYSQL_PASSWORD'),
      database: this.getValue('MYSQL_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true
    };
  }

}

const configService = new ConfigService(process.env);

export { configService };