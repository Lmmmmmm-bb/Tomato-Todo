import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  CreateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Todo extends BaseEntity {
  @PrimaryColumn({ comment: 'Identify Todo.' })
  @ApiProperty({
    description: 'Todo UUID as identification.',
    required: true,
    example: '2f8f0d8f-fc5e-4919-bddd-46e55cc41571'
  })
  uuid: string;

  @CreateDateColumn({ name: 'create_at', comment: 'Todo created dates.' })
  @ApiProperty({ description: 'Todo created date.' })
  createdAt: Date;

  @Column({ comment: 'Save this Todo title.' })
  @ApiProperty({
    description: 'Todo title',
    required: true,
    example: '教育学原理背诵'
  })
  title: string;

  @Column({
    name: 'total_time',
    default: 0,
    comment: 'Count total study time.'
  })
  @ApiProperty({
    description: 'Todo total study time.',
    default: 0
  })
  totalTime: number;

  @Column({
    name: 'today_time',
    default: 0,
    comment: "Count today's study time."
  })
  @ApiProperty({
    description: 'Todo today study time.',
    default: 0
  })
  todayTime: number;

  @Column({
    name: 'total_count',
    default: 0,
    comment: 'Count total study times.'
  })
  @ApiProperty({
    description: 'Todo total study times.',
    default: 0
  })
  totalCount: number;

  @Column({
    name: 'today_count',
    default: 0,
    comment: "Count today's study times."
  })
  @ApiProperty({
    description: 'Todo today study times.',
    default: 0
  })
  todayCount: number;

  @Column({ name: 'theme_class', comment: 'Save this Todo theme class name.' })
  @ApiProperty({
    description: 'Todo theme class name.',
    required: true,
    example: 'bg-blue-200'
  })
  themeClass: string;

  @Column({
    name: 'give_up_times',
    default: 0,
    comment: 'Count the give up times.'
  })
  @ApiProperty({
    description: 'Todo total give up times.',
    default: 0
  })
  giveUpTimes: number;
}

export default Todo;
