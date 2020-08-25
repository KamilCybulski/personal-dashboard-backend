import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  notes: string;
}
