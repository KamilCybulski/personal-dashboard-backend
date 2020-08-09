import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { UserDTO } from './dto';

@Entity()
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
