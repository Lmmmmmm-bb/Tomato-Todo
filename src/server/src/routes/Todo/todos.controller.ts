import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Put
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';

import TodosService from './todos.service';
import {
  ITodo,
  CreateTodoRequestBodyDto,
  DeleteTodoByUUIDRequestBodyDto,
  SaveTodoByUUIDRequestBodyDto
} from './todos.dto';

@Controller('todos')
@ApiTags('Todo')
class TodosController {
  constructor(private readonly TodosService: TodosService) {}

  @Get('getAllTodos')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Fetch data from database success.'
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Some problems with the database.'
  })
  getAllTodos() {
    return this.TodosService.findAllTodos();
  }

  @Put('createTodo')
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Create Todo success.' })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'This Todo already exist. Insert to SQL conflict.'
  })
  @ApiBody({
    type: CreateTodoRequestBodyDto,
    description: 'Create Todo.'
  })
  createTodo(@Body('todo') todo: ITodo) {
    return this.TodosService.createTodo(todo);
  }

  @Delete('deleteTodoByUUID')
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Delete Todo success.' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'This UUID Todo is not found.'
  })
  @ApiBody({
    type: DeleteTodoByUUIDRequestBodyDto,
    description: 'Delete the specified todo based on UUID'
  })
  deleteTodoByUUID(@Body('uuid', new ParseUUIDPipe()) uuid) {
    return this.TodosService.deleteTodoByUUID(uuid);
  }

  @Post('saveTodoByUUID')
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Edit Todo success.' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Edit Todo fail.'
  })
  @ApiBody({
    type: SaveTodoByUUIDRequestBodyDto,
    description: 'Edit Todo By UUID.'
  })
  saveTodoByUUID(@Body() body: SaveTodoByUUIDRequestBodyDto) {
    const { uuid, options } = body;
    return this.TodosService.saveTodoByUUID(uuid, options);
  }
}

export default TodosController;
