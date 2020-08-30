import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { TodoStatus } from './types';
import { TodoDTO } from './dto';
import { User } from 'src/user/user.entity';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  notes: string;

  @Column()
  status: TodoStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  position: number;

  @ManyToOne(
    type => User,
    user => user.todos,
    { eager: false },
  )
  user: User;

  toDTO(): TodoDTO {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      position: this.position,
    };
  }
}
