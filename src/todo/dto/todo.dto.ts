import { TodoStatus } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  status: TodoStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
