import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { jwtConfig } from 'src/config/jwtconfig';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../types';
import { UserDTO } from 'src/user/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDTO> {
    const { id } = payload;
    const user = await this.userService.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user.toDTO();
    }
  }
}
