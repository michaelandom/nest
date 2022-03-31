import { ApiProperty } from '@nestjs/swagger';

export class Product {
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
}
