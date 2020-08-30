import { EntityRepository, Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoStatus } from './types';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  private async findNextPosition(user: User): Promise<number> {
    const allTodos = await this.getAllTodos(user);
    return allTodos.length === 0
      ? 0
      : allTodos
        .map((todo) => todo.position)
        .reduce((acc, current) => current > acc ? current : acc) + 1;
  }

  private async updateConsecutivePositions(startFrom: number, user: User): Promise<void> {
    await this.createQueryBuilder().update().set({
      position: () => "position - 1",
    })
    .where('userId = :id', { id: user.id })
    .where('position > :startFrom', { startFrom })
    .execute()
  }

  async createTodo(dto: CreateTodoDTO, user: User): Promise<Todo> {
    const { name, notes } = dto;
    const position = await this.findNextPosition(user);

    const todo = new Todo();
    todo.name = name;
    todo.notes = notes;
    todo.status = TodoStatus.inProgress;
    todo.position = position;
    todo.user = user;

    await todo.save();
    return todo;
  }

  getAllTodos(user: User): Promise<Todo[]> {
    return this.find({ where: { user: user.id } })
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

  async deleteTodo(id: number, user: User): Promise<void> {
    const todo = await this.findOne(id);
    await this.remove([todo]);
    await this.updateConsecutivePositions(todo.position, user);
  }
}
