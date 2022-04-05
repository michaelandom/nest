import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // to tell orm that this is a database entity
@ObjectType() // to tell graphql that this is a object type
export class Pet {
  @PrimaryGeneratedColumn() // to tell orm that this is a primary key
  @Field((type) => Int)
  id: number;
  @Column()
  @Field()
  name: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;
  @Column()
  @Field((type) => Int)
  ownerId: number;
  @ManyToOne(() => Owner, (owner) => owner.pet)
  @Field((type) => Owner)
  owner: Owner;
}
