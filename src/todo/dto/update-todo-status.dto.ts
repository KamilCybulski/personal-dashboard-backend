import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus } from '../types';

export class UpdateTodoStatusDTO {
  @ApiProperty()
  status: TodoStatus;
}
