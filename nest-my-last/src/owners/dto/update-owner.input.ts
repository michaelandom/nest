import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  @IsAlpha()
  name?: string;
}
