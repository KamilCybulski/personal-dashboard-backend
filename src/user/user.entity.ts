import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
} from 'typeorm';
import { UserDTO } from './dto';

@Entity()
@Unique(['name'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
