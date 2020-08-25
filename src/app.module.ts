import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { ormConfig } from './config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, UserModule, TodoModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
