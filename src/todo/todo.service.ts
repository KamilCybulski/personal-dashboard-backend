import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoRepository } from './todo.repository';
import { TodoDTO } from './dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoStatus } from './types';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  getAll(): Promise<TodoDTO[]> {
    return this.todoRepository.find();
  }

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

  async deleteTodo(id: number): Promise<void> {
    const { affected } = await this.todoRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateStatus(id: number, status: TodoStatus): Promise<TodoDTO> {
    const updatedTodo = await this.todoRepository.updateTodoStatus(id, status);
    return updatedTodo.toDTO();
  }
}
