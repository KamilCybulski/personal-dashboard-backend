import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDTO {
  @ApiProperty({
    minLength: 3,
    maxLength: 20,
  })
  @Length(3, 20)
  name: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 20,
  })
  @Length(6, 20)
  password: string;
}
