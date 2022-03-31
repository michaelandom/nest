import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
}
export class ProductResponseCreated {
  @ApiProperty()
  id: string;
}
