import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto';
import { SignInResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: CredentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) body: CredentialsDTO): Promise<SignInResponse> {
    return this.authService.signIn(body);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req: any): void {
    console.log(req.user);
  }
}
