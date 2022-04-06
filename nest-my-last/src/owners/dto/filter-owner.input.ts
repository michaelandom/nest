import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class FilterOwnerInput extends PartialType(CreateOwnerInput) {
  @Field({ nullable: true })
  @IsAlpha()
  name?: string;
}
