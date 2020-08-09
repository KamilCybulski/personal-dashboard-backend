import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CredentialsDTO } from './dto/index.';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(dto: CredentialsDTO): Promise<void> {
    return this.userService.create(dto);
  }
}
