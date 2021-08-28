import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import AppController from './app.controller';
import AppService from './app.service';

import Routes from 'src/routes';

@Module({
  imports: [TypeOrmModule.forRoot(), ...Routes],
  controllers: [AppController],
  providers: [AppService]
})
class AppModule {
  constructor(private readonly connection: Connection) {}
}

export default AppModule;
