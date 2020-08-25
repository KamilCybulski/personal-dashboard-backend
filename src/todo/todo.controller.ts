import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { TodoDTO } from './dto';
import { CreateTodoDTO } from './dto/create-todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TodoDTO })
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<TodoDTO> {
    return this.todoService.getById(id);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateTodoDTO })
  @ApiResponse({ status: 201, type: TodoDTO })
  @Post()
  create(@Body() body: CreateTodoDTO): Promise<TodoDTO> {
    return this.todoService.createTodo(body);
  }
}
