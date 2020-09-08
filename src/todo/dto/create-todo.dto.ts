import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsOptional,
  IsString,
  IsDefined,
  IsDateString,
} from 'class-validator';

export class CreateTodoDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsDefined()
  @Length(3, 20)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3, 50)
  @IsOptional()
  notes?: string;

  @ApiProperty({
    required: false,
    description: 'Date string (ISO 8601 Extended Format)',
  })
  @IsString()
  @IsDateString()
  @IsOptional()
  resolveAt?: string;
}
