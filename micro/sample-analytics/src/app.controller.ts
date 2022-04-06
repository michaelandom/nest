import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEventDto } from './create-user-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('create-user-event')
  handleUserCreated(data: CreateUserEventDto): string {
    return this.appService.createUsers(data);
  }

  @MessagePattern({ cmd: 'get-analytics' })
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
