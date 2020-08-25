import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { TodoDTO } from './dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoStatusDTO } from './dto/update-todo-status.dto';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Todo')
@UseGuards(AuthGuard())
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [TodoDTO] })
  @Get()
  getAll(@GetUser() user: User): Promise<TodoDTO[]> {
    return this.todoService.getAll(user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TodoDTO })
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<TodoDTO> {
    return this.todoService.getById(id, user);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CreateTodoDTO })
  @ApiResponse({ status: 201, type: TodoDTO })
  @Post()
  create(
    @Body() body: CreateTodoDTO,
    @GetUser() user: User,
    ): Promise<TodoDTO> {
    return this.todoService.createTodo(body, user);
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
    @GetUser() user: User,
  ): Promise<TodoDTO> {
    return this.todoService.updateStatus(id, dto.status, user);
  }
}
