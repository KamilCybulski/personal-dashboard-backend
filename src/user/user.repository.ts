import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './user.entity';
import { CredentialsDTO } from 'src/auth/dto';
import { SqlErrorCodes } from 'src/constants';
import { ConflictException } from '@nestjs/common';

interface HashPasswordResult {
  hash: string;
  salt: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<void> {
    const { name, password } = dto;
    const { hash, salt } = await this.hashPassword(password);

    const user = new User();
    user.name = name;
    user.password = hash;
    user.salt = salt;

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

  async hashPassword(password: string): Promise<HashPasswordResult> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return { salt, hash };
  }
}
