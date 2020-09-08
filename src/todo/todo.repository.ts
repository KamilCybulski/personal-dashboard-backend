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
          .map(todo => todo.position)
          .reduce((acc, current) => (current > acc ? current : acc)) + 1;
  }

  private async decreaseConsecutivePositions(
    startFrom: number,
    user: User,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({
        position: () => 'position - 1',
      })
      .where('userId = :id', { id: user.id })
      .andWhere('position > :startFrom', { startFrom })
      .execute();
  }

  private async changeTodoPositionUp(
    todo: Todo,
    newPosition: number,
    user: User,
  ): Promise<Todo> {
    const prevPosition = todo.position;

    // Update todo position to desired number
    todo.position = newPosition;
    await todo.save();

    // Increase the position of items in the gap
    await this.createQueryBuilder()
      .update()
      .set({
        position: () => 'position + 1',
      })
      .where('userId = :userId', { userId: user.id })
      .andWhere('id != :id', { id: todo.id })
      .andWhere('position >= :newPosition', { newPosition })
      .andWhere('position < :prevPosition', { prevPosition })
      .execute();

    return todo;
  }

  private async changeTodoPositionDown(
    todo: Todo,
    newPosition: number,
    user: User,
  ): Promise<Todo> {
    const prevPosition = todo.position;

    // Increase position below newPosition to create a gap
    await this.createQueryBuilder()
      .update()
      .set({
        position: () => 'position + 1',
      })
      .where('userId = :userId', { userId: user.id })
      .andWhere('position > :newPosition', { newPosition })
      .execute();

    // Update items position to fill the gap
    todo.position = newPosition;
    await todo.save();

    // Decrease the position of everything below prevPosition to remove remaining gap
    await this.createQueryBuilder()
      .update()
      .set({
        position: () => 'position - 1',
      })
      .where('userId = :userId', { userId: user.id })
      .andWhere('id != :id', { id: todo.id })
      .andWhere('position > :prevPosition', { prevPosition })
      .execute();

    return todo;
  }

  async createTodo(dto: CreateTodoDTO, user: User): Promise<Todo> {
    const { name, notes, resolveAt } = dto;
    const position = await this.findNextPosition(user);

    const todo = new Todo();
    todo.name = name;
    todo.notes = notes || null;
    todo.status = TodoStatus.inProgress;
    todo.position = position;
    todo.resolveAt = resolveAt ? new Date(resolveAt) : null;
    todo.user = user;

    await todo.save();
    return todo;
  }

  getAllTodos(user: User): Promise<Todo[]> {
    return this.find({ where: { userId: user.id } });
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
    const todo = await this.getTodoById(id, user);

    todo.status = status;
    todo.save();
    return todo;
  }

  async updateTodoPosition(
    id: number,
    newPosition: number,
    user: User,
  ): Promise<Todo> {
    const todo = await this.getTodoById(id, user);

    if (todo.position === newPosition) return;

    return newPosition < todo.position
      ? this.changeTodoPositionUp(todo, newPosition, user)
      : this.changeTodoPositionDown(todo, newPosition, user);
  }

  async deleteTodo(id: number, user: User): Promise<void> {
    const todo = await this.findOne(id);

    if (todo.userId !== user.id) {
      throw new UnauthorizedException();
    }

    await this.remove([todo]);
    await this.decreaseConsecutivePositions(todo.position, user);
  }
}
