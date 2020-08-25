import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
