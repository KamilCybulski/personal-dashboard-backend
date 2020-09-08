import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class UpdateTodoResolveDateDTO {
  @ApiProperty({ description: 'Date string (ISO 8601 Extended Format)' })
  @IsString()
  @IsDateString()
  resolveAt: string;
}
