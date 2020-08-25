import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto';
import { SignInResponse } from './types';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('/signup')
  signUp(@Body(ValidationPipe) body: CredentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  @ApiBody({ type: CredentialsDTO })
  @ApiResponse({ status: 200, type: SignInResponse })
  @ApiResponse({ status: 401, description: 'Unautorized' })
  signIn(@Body(ValidationPipe) body: CredentialsDTO): Promise<SignInResponse> {
    return this.authService.signIn(body);
  }
}
