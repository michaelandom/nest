import { Injectable } from '@nestjs/common';
import { UsersResponse } from './entites/uses.entites';

@Injectable()
export class AppService {
  private userList = [
    { id: '1', name: 'mkichael' },
    { id: '2', name: 'max' },
  ];
  getHello(name?: string): UsersResponse[] {
    if (name) {
      const user = this.userList.find((user) => user.name === name);
      return [user];
    }
    return [...this.userList];
  }

  createUser(name: string): UsersResponse {
    return { id: Math.random().toString(), name: name };
  }

  getSingle(id: string): UsersResponse {
    return { id: id, name: 'max' };
  }
}
