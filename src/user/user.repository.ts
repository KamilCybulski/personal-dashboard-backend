import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';
import { CredentialsDTO } from 'src/auth/dto/index.';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(dto: CredentialsDTO): Promise<void> {
    const { name, password } = dto;

    const user = new User();
    user.name = name;
    user.password = password;
    await user.save();
  }
}
