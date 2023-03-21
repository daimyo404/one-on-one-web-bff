import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): string {
    return 'Hello World!World!';
  }

  postUsers(): string {
    return 'Hello World!World!';
  }
}
