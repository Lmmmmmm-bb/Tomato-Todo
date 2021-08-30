import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';

import TodosService from './todos.service';
import {
  ITodo,
  CreateTodoRequestBodyDto,
  DeleteTodoByUUIDRequestBodyDto,
  SaveTodoByUUIDRequestBodyDto,
  GetTodoByUUIDRequestQueryDto
} from './todos.dto';
import { TodosControllerDes } from './todos.constant';

@Controller('todos')
@ApiTags('Todo')
class TodosController {
  constructor(private readonly TodosService: TodosService) {}

  @Get('getAllTodos')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: TodosControllerDes.getAllTodos.response.ok
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: TodosControllerDes.getAllTodos.response.notFound
  })
  getAllTodos() {
    return this.TodosService.findAllTodos();
  }

  @Get('getTodoByUUID')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: TodosControllerDes.getTodoByUUID.response.ok
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: TodosControllerDes.getTodoByUUID.response.notFound
  })
  @ApiQuery({
    type: GetTodoByUUIDRequestQueryDto,
    description: TodosControllerDes.getTodoByUUID.query
  })
  getTodoByUUID(@Query('uuid') uuid) {
    return this.TodosService.findTodoByUUID(uuid as string);
  }

  @Put('createTodo')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: TodosControllerDes.createTodo.response.ok
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: TodosControllerDes.createTodo.response.conflict
  })
  @ApiBody({
    type: CreateTodoRequestBodyDto,
    description: TodosControllerDes.createTodo.body
  })
  createTodo(@Body('todo') todo: ITodo) {
    return this.TodosService.createTodo(todo);
  }

  @Delete('deleteTodoByUUID')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: TodosControllerDes.deleteTodoByUUID.response.ok
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: TodosControllerDes.deleteTodoByUUID.response.notFound
  })
  @ApiBody({
    type: DeleteTodoByUUIDRequestBodyDto,
    description: TodosControllerDes.deleteTodoByUUID.body
  })
  deleteTodoByUUID(@Body('uuid') uuid) {
    return this.TodosService.deleteTodoByUUID(uuid);
  }

  @Post('saveTodoByUUID')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: TodosControllerDes.saveTodoByUUID.response.ok
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: TodosControllerDes.saveTodoByUUID.response.notFound
  })
  @ApiBody({
    type: SaveTodoByUUIDRequestBodyDto,
    description: TodosControllerDes.saveTodoByUUID.body
  })
  saveTodoByUUID(@Body() body: SaveTodoByUUIDRequestBodyDto) {
    const { uuid, options } = body;
    return this.TodosService.saveTodoByUUID(uuid, options);
  }
}

export default TodosController;
