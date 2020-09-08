import { TodoStatus } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  notes: string | null;

  @ApiProperty({ enum: TodoStatus })
  status: TodoStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true })
  resolveAt: Date | null;

  @ApiProperty()
  position: number;
}
