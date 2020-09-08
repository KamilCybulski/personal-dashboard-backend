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

  @Column({ nullable: true })
  notes: string | null;

  @Column()
  status: TodoStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  resolveAt: Date | null;

  @Column()
  position: number;

  @ManyToOne(
    type => User,
    user => user.todos,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  toDTO(): TodoDTO {
    return {
      id: this.id,
      name: this.name,
      notes: this.notes,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      resolveAt: this.resolveAt,
      position: this.position,
    };
  }
}
