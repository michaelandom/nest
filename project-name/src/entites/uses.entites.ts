import { ApiProperty } from '@nestjs/swagger';

export class UsersResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
