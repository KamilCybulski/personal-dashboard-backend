import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { TodoDTO } from './dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoStatusDTO } from './dto/update-todo-status.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [TodoDTO] })
  @Get()
  getAll(): Promise<TodoDTO[]> {
    return this.todoService.getAll();
  }

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

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Sucessfully deleted task' })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateTodoStatusDTO })
  @ApiResponse({ status: 200, type: TodoDTO })
  @Patch('/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoStatusDTO,
  ): Promise<TodoDTO> {
    return this.todoService.updateStatus(id, dto.status);
  }
}
