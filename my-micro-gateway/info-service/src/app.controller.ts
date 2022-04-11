import { Controller, Get } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePetInput } from './pets/dto/create-pet.input';
import { Pet } from './pets/entities/pet.entity';
import { PetsResolver } from './pets/pets.resolver';

@Resolver(() => Pet)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly petsResolver: PetsResolver,
  ) {}

  @MessagePattern({ cmd: 'get-Pets' })
  getPets() {
    return this.petsResolver.findAll();
  }

  @MessagePattern({ cmd: 'create-pets' })
  createPets(createPetInput: CreatePetInput) {
    return this.petsResolver.createPet(createPetInput);
  }
}
