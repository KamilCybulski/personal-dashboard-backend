import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { CredentialsDTO } from 'src/auth/dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  create(dto: CredentialsDTO): Promise<void> {
    return this.userRepository.createUser(dto);
  }

  findByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }
}
