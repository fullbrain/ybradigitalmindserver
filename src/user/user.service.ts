import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return 'THIS IS ME FROM THE SERVICE';
  }
}
