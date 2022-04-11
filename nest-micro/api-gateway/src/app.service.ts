import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDto } from './create-order.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createOrder({ userId, price }: CreateOrderDto) {
    return this.billingClient.emit(
      'order-created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
