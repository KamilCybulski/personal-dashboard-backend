import { UserDTO } from 'src/user/dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty()
  accessToken: string;
}

export type JwtPayload = UserDTO;
