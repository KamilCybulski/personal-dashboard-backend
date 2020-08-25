import { EntityRepository, Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoStatus } from './types';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(dto: CreateTodoDTO, user: User): Promise<Todo> {
    const { name, notes } = dto;

    const todo = new Todo();
    todo.name = name;
    todo.notes = notes;
    todo.status = TodoStatus.inProgress;
    todo.user = user;

    await todo.save();
    return todo;
  }

  async updateTodoStatus(id: number, status: TodoStatus): Promise<Todo> {
    const todo = await this.findOne(id);

    if (!todo) {
      throw new NotFoundException();
    }

    todo.status = status;
    todo.save();
    return todo;
  }
}
