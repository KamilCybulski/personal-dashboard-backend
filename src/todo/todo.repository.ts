import { EntityRepository, Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoStatus } from './types';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

  async createTodo(dto: CreateTodoDTO): Promise<Todo> {
    const { name, notes } = dto;

    const todo = new Todo();
    todo.name = name;
    todo.notes = notes;
    todo.status = TodoStatus.inProgress;

    await todo.save();
    return todo;
  }
}
