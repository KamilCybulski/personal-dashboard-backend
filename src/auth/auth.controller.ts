import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDTO } from './dto';
import { UserDTO } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: CredentialsDTO): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) body: CredentialsDTO): Promise<UserDTO> {
    const { name, password } = body;
    const user = await this.authService.validateCredentials(name, password);

    if (user) {
      return user.toDTO();
    }
  }
}
