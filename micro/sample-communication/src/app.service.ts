import { Injectable } from '@nestjs/common';
import { CreateUserEventDto } from './create-user-event.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  createUsers(createUserEventDto: CreateUserEventDto): string {
    console.log('handleUserCreated - communication ', createUserEventDto);
    return 'User created successfully';
  }
}
