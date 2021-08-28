import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
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

  @Column({ comment: 'Save this Todo title.' })
  @ApiProperty({
    description: 'Todo title',
    required: true,
    example: '教育学原理背诵'
  })
  title: string;

  @Column({ default: 0, comment: 'Count total study time.' })
  @ApiProperty({
    description: 'Todo total study time.',
    default: 0
  })
  total_time: number;

  @Column({ default: 0, comment: "Count today's study time." })
  @ApiProperty({
    description: 'Todo today study time.',
    default: 0
  })
  today_time: number;

  @Column({ default: 0, comment: 'Count total study times.' })
  @ApiProperty({
    description: 'Todo total study times.',
    default: 0
  })
  total_count: number;

  @Column({ default: 0, comment: "Count today's study times." })
  @ApiProperty({
    description: 'Todo today study times.',
    default: 0
  })
  today_count: number;

  @Column({ comment: 'Save this Todo theme class name.' })
  @ApiProperty({
    description: 'Todo theme class name.',
    required: true,
    example: 'bg-blue-200'
  })
  theme_class: string;

  @Column({ default: 0, comment: 'Count the give up times.' })
  @ApiProperty({
    description: 'Todo total give up times.',
    default: 0
  })
  give_up_times: number;
}

export default Todo;
