import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { UserDTO } from './dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserDTO })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('/me')
  getMe(@GetUser() user: User): UserDTO {
    return user.toDTO();
  }
}
