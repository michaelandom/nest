import { Injectable } from '@nestjs/common';
import { CreateUserEventDto } from './create-user-event.dto';

@Injectable()
export class AppService {
  private readonly analytics: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  createUsers(createUserEventDto: CreateUserEventDto): string {
    console.log('handleUserCreated - analytics', createUserEventDto);
    this.analytics.push({
      email: createUserEventDto.email,
      createdDate: new Date(),
    });
    return 'User created successfully';
  }

  getAnalytics() {
    return this.analytics;
  }
}
