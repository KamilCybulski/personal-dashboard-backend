import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '../types';
import { IsEnum } from 'class-validator';

export class UpdateTodoStatusDTO {
  @ApiProperty({ enum: TodoStatus })
  @IsEnum(TodoStatus, { message: `Must be one of: ["${TodoStatus.done}", "${TodoStatus.inProgress}"]` })
  status: TodoStatus;
}
