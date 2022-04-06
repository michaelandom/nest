import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEventDto } from './create-user-event.dto';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AppService {
  private readonly users: CreateUserDto[] = [];
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analytics: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createUsers(createUser: CreateUserDto): string {
    this.users.push(createUser);
    this.communicationClient.emit(
      'create-user-event',
      new CreateUserEventDto(createUser.email),
    );
    this.analytics.emit(
      'create-user-event',
      new CreateUserEventDto(createUser.email),
    );
    return 'User created successfully';
  }
  getAnalytics() {
    return this.analytics.send({ cmd: 'get-analytics' }, {});
  }
}
