import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserDTO } from './dto';
import { Todo } from 'src/todo/todo.entity';

@Entity()
@Unique(['name'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Todo,
    todo => todo.user,
    { eager: true },
  )
  todos: Todo[];

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
    };
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
