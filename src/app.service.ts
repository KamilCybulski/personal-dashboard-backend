import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello, process: ${process.env.POSTGRES_USER} is working`;
  }
}
