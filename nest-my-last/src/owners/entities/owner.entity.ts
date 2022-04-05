import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pets.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn() // to tell orm that this is a primary key
  @Field((type) => Int)
  id: number;
  @Column()
  @Field()
  name: string;

  @Field((type) => [Pet], { nullable: true })
  @OneToMany(() => Pet, (pet) => pet.owner)
  pet?: Pet[];
}
