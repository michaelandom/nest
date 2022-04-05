import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
@InputType() //Decorator that marks a class as a GraphQL input type.
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;
  @Field(() => Int)
  ownerId: number;
  @Field({ nullable: true })
  type?: string;
}
