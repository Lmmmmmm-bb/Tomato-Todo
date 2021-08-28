import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TodosController from './todos.controller';
import TodosService from './todos.service';
import Todo from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodosController]
})
class TodosModule {}

export default TodosModule;
