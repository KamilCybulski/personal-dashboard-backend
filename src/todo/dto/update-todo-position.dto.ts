import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoPositionDTO {
  @ApiProperty()
  newPosition: number;
}
