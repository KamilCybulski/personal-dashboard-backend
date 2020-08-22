import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { UserDTO } from './dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  @Get('/me')
  getMe(@GetUser() user: UserDTO): UserDTO {
    return user;
  }

}
