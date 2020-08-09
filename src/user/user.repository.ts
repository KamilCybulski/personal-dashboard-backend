import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';
import { CredentialsDTO } from 'src/auth/dto/index.';
import { SqlErrorCodes } from 'src/constants';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<void> {
    const { name, password } = dto;
    const user = new User();
    user.name = name;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code === SqlErrorCodes.UniqueViolation) {
        throw new ConflictException();
      } else {
        throw error;
      }
    }
  }
}
