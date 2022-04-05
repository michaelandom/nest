import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
@InputType() //Decorator that marks a class as a GraphQL input type.
export class UpdatePetInput {
  @IsInt()
  @Field((type) => Int)
  id: number;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  type?: string;
}
