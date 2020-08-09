import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto/index.';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: CredentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }
}
