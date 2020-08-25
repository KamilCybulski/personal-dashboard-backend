import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoRepository } from './todo.repository';
import { TodoDTO } from './dto';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async getById(id: number): Promise<TodoDTO> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo.toDTO();
  }

  async createTodo(dto: CreateTodoDTO): Promise<TodoDTO> {
    const todo = await this.todoRepository.createTodo(dto);
    return todo.toDTO();
  }
}
