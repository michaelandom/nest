import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @Field()
  @IsAlpha()
  name: string;
}
