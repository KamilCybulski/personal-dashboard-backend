import { UserDTO } from 'src/user/dto';

export interface SignInResponse {
  accessToken: string;
}

export type JwtPayload = UserDTO;
