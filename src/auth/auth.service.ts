import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { CredentialsDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(dto: CredentialsDTO): Promise<void> {
    return this.userService.create(dto);
  }

  async validateCredentials(name: string, password: string): Promise<User> {
    const user = await this.userService.findByName(name);
    if (!user || !(await user.validatePassword(password)))
      throw new UnauthorizedException();

    return user;
  }
}
