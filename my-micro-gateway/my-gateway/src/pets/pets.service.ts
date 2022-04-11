import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
  ) {}
  getPets() {
    return this.communicationClient.send({ cmd: 'get-Pets' }, {});
  }
  create(createPetInput: CreatePetInput) {
    return this.communicationClient.send(
      { cmd: 'create-pets' },
      createPetInput,
    );
  }
}
