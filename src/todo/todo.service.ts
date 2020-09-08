import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TodoRepository } from './todo.repository';
import { TodoDTO } from './dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoStatus } from './types';
import { User } from 'src/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async getAll(user: User): Promise<TodoDTO[]> {
    const todos = await this.todoRepository.getAllTodos(user);
    return todos
      .sort((first, second) => first.position - second.position)
      .map(todo => todo.toDTO());
  }

  async getById(id: number, user: User): Promise<TodoDTO> {
    const todo = await this.todoRepository.getTodoById(id, user);
    return todo.toDTO();
  }

  async createTodo(dto: CreateTodoDTO, user: User): Promise<TodoDTO> {
    const todo = await this.todoRepository.createTodo(dto, user);
    return todo.toDTO();
  }

  deleteTodo(id: number, user: User): Promise<void> {
    return this.todoRepository.deleteTodo(id, user);
  }

  async updateStatus(
    id: number,
    status: TodoStatus,
    user: User,
  ): Promise<TodoDTO> {
    const updatedTodo = await this.todoRepository.updateTodoStatus(
      id,
      status,
      user,
    );
    return updatedTodo.toDTO();
  }

  async updatePosition(
    id: number,
    newPosition: number,
    user: User,
  ): Promise<TodoDTO> {
    const updatedTodo = await this.todoRepository.updateTodoPosition(
      id,
      newPosition,
      user,
    );
    return updatedTodo.toDTO();
  }

  async updateResolveDate(
    id: number,
    newDateString: string,
    user: User
  ): Promise<TodoDTO> {
    const newDate = new Date(newDateString);
    const updatedTodo = await this.todoRepository.updateTodoResolveDate(id, newDate, user);
    return updatedTodo.toDTO();
  }
}
