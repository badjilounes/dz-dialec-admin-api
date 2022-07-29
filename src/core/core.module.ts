import { Global, Module } from '@nestjs/common';

import { AppDatabaseModule } from './app-database/app-typeorm.module';
import { AppWinstonModule } from './app-winston/app-winston.module';

@Global()
@Module({
  imports: [AppWinstonModule, AppDatabaseModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
