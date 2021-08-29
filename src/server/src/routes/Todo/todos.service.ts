import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Todo from './todo.entity';
import { ITodo } from './todos.dto';
import { Response } from 'src/models/http';

@Injectable()
class TodosService {
  private readonly todos: ITodo[] = [];

  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>
  ) {}

  /**
   * Find All Todos.
   * @returns Promise With Todo List.
   */
  async findAllTodos(): Promise<Response<ITodo[]>> {
    try {
      const todosList = await this.todosRepository.find({
        order: { createdAt: 1 }
      });
      return {
        status: HttpStatus.OK,
        message: 'Get All Todos Success.',
        data: { data: todosList }
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

  /**
   * Find Todo By UUID.
   * @param uuid Todo UUID.
   * @returns Promise With Todo.
   */
  async findTodoByUUID(uuid: string): Promise<Response<ITodo>> {
    try {
      const o = await this.todosRepository.findOne({ uuid });
      return {
        status: HttpStatus.OK,
        message: 'Find Todo By UUID Success.',
        data: { data: o }
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

  /**
   * Create Todo With ITodo Properties.
   * @param newTodo Todo Instance Of Implement ITodo Interface.
   * @returns Promise With New Todo.
   */
  async createTodo(newTodo: ITodo): Promise<Response<ITodo>> {
    try {
      await this.todosRepository.insert(newTodo);
      const allTodos = await this.todosRepository.find();

      return {
        status: HttpStatus.OK,
        message: 'Create New Todo Success.',
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

  /**
   * Delete Todo By UUID.
   * @param uuid Todo UUID.
   * @returns Promise With Status.
   */
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

  /**
   * Save Or Update Todo By UUID.
   * @param uuid Todo UUID.
   * @param options Save Todo Instance Options.
   * @returns Promise With Saved Todo.
   */
  async saveTodoByUUID(
    uuid: string,
    options: { [key in keyof ITodo]?: ITodo[key] }
  ): Promise<Response<ITodo>> {
    try {
      await this.todosRepository.update(uuid, options);
      const o = await this.todosRepository.findOne({ uuid });
      return {
        status: HttpStatus.OK,
        message: 'Save Todo By UUID Success.',
        data: { data: o }
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
}

export default TodosService;
