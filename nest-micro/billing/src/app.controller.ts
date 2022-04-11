import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('Auth_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order-created')
  handleOrderCreated(data: any) {
    this.appService.handleOrderCreated(data.value);
  }
  onModuleInit() {
    this.authClient.subscribeToResponseOf('get-user');
  }
}
