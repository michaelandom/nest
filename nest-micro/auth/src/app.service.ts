import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './get-user-request.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [
    {
      userId: '1',
      stripeUserId: 'cus_HJKL',
    },
    {
      userId: '2',
      stripeUserId: 'cus_ABCD',
    },
  ];
  getHello(): string {
    return 'Hello World!';
  }
  handleGetUserRequest(data: GetUserRequest) {
    return this.users.find((user) => user.userId === data.userId);
  }
}
