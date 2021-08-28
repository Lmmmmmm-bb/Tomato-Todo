import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'src/models/http';

import Todo from './todo.entity';
import { ITodo } from './todos.dto';

@Injectable()
class TodosService {
  private readonly todos: ITodo[] = [];

  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>
  ) {}

  async findAllTodos(): Promise<Response<ITodo[]>> {
    try {
      const allTodos = await this.todosRepository.find();
      return {
        status: HttpStatus.OK,
        message: 'Get All Todos Success.',
        data: { data: allTodos }
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: err.message
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async createTodo(newTodo: ITodo): Promise<Response<ITodo>> {
    try {
      await this.todosRepository.insert(newTodo);
      const allTodos = await this.todosRepository.find();

      return {
        status: HttpStatus.OK,
        message: 'Create new Todo Success.',
        data: { data: newTodo, allTodos }
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: err.message
        },
        HttpStatus.CONFLICT
      );
    }
  }

  async deleteTodoByUUID(uuid: string): Promise<Response> {
    try {
      await this.todosRepository.delete({ uuid });
      return {
        status: HttpStatus.OK,
        message: 'Delete Todo By UUID is success.'
      };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: err.message
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  async saveTodoByUUID(
    uuid: string,
    options: { [key in keyof ITodo]?: ITodo[key] }
  ) {
    console.log(uuid, options);
    console.log(await this.todosRepository.update(uuid, options));
  }
}

export default TodosService;
