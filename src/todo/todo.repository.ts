import { EntityRepository, Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoStatus } from './types';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getTodoById(id: number, user: User): Promise<Todo> {
    const todo = await this.findOne(id, { relations: ['user'] });

    if (!todo) {
      throw new NotFoundException();
    }

    if (todo.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return todo;
  }

  async updateTodoStatus(
    id: number,
    status: TodoStatus,
    user: User,
  ): Promise<Todo> {
    const todo = await this.findOne(id, { relations: ['user'] });

    if (!todo) {
      throw new NotFoundException();
    }

    if (todo.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    todo.status = status;
    todo.save();
    return todo;
  }
}
