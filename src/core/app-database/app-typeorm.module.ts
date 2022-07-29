import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { AppWinstonModule } from '../app-winston/app-winston.module';

import { AppTypeormLogger } from './app-typeorm.logger';

@Module({
  imports: [AppWinstonModule, ConfigModule],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
          synchronize: true,
          logger: new AppTypeormLogger(),
        });

        return dataSource.initialize();
      },
      inject: [ConfigService],
    },
  ],
})
export class AppDatabaseModule {}
