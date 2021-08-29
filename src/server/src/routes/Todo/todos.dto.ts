import { ApiProperty } from '@nestjs/swagger';

import Todo from './todo.entity';

export interface ITodo {
  uuid: string;
  title: string;
  totalTime: number;
  todayTime: number;
  totalCount: number;
  todayCount: number;
  themeClass: string;
  giveUpTimes: number;
  createdAt: Date;
}

export class CreateTodoRequestBodyDto {
  @ApiProperty({ description: 'The create new Todo properties.' })
  todo: Todo;
}

export class DeleteTodoByUUIDRequestBodyDto {
  @ApiProperty({
    description: 'The delete Todo UUID.',
    example: '2f8f0d8f-fc5e-4919-bddd-46e55cc41571'
  })
  uuid: string;
}

export class SaveTodoByUUIDRequestBodyDto {
  @ApiProperty({
    description: 'The edit Todo by UUID properties.',
    example: '2f8f0d8f-fc5e-4919-bddd-46e55cc41571'
  })
  uuid: string;

  @ApiProperty({
    description: 'The edit Todo properties Omit UUID.',
    example: { title: 'expamle' }
  })
  options: { [key in keyof Omit<ITodo, 'uuid'>]?: ITodo[key] };
}

export class GetTodoByUUIDRequestQueryDto {
  @ApiProperty({
    description: 'The Todo UUID properties.',
    example: '2f8f0d8f-fc5e-4919-bddd-46e55cc41571'
  })
  uuid: string;
}
