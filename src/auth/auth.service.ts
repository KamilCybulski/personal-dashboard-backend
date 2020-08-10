import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { CredentialsDTO } from './dto';
import { SignInResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  signUp(dto: CredentialsDTO): Promise<void> {
    return this.userService.create(dto);
  }

  async signIn(dto: CredentialsDTO): Promise<SignInResponse> {
    const { name, password } = dto;

    const user = await this.validateCredentials(name, password);
    const accessToken = this.jwtService.sign(user.toDTO());

    return { accessToken };
  }

  async validateCredentials(name: string, password: string): Promise<User> {
    const user = await this.userService.findByName(name);
    if (!user || !(await user.validatePassword(password)))
      throw new UnauthorizedException();

    return user;
  }
}
