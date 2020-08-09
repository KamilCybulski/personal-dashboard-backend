import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { CredentialsDTO } from 'src/auth/dto/index.';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  create(dto: CredentialsDTO): Promise<void> {
    return this.userRepository.createUser(dto);
  }
}
