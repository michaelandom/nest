import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private ownersService: OwnersService,
  ) {}

  createPet(pet: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(pet);
    return this.petRepository.save(newPet);
  }
  updatePet(id: number, pet: CreatePetInput): Promise<Pet> {
    // const update = this.petRepository.update(id, pet);

    return this.petRepository.findOneOrFail(id);
  }
  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find();
  }

  async findPetById(id: number): Promise<Pet> {
    return this.petRepository.findOneOrFail(id);
  }
  async findPetByOwnerId(ownerId: number): Promise<Pet[]> {
    return this.petRepository.find({ ownerId: ownerId });
  }
  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
