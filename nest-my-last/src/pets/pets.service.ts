import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pets.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private ownersService: OwnersService,
  ) {}
  async CreatePets(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(createPetInput);

    return this.petRepository.save(newPet);
  }
  async UpdatePet(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
    const pet = await this.petRepository.findOneOrFail(id);
    if (updatePetInput.name) {
      pet.name = updatePetInput.name;
    }
    if (updatePetInput.type) {
      pet.type = updatePetInput.type;
    }
    this.petRepository.update(id, pet);
    return pet;
  }

  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find();
  }

  async findById(id: number): Promise<Pet> {
    const pet = this.petRepository.findOneOrFail(id);
    if (!pet) {
      // throw
    }
    return pet;
  }
  async deleteById(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOneOrFail(id);

    this.petRepository.remove(pet);
    return pet;
  }
  async findByOwnerId(ownerId: number): Promise<Pet[]> {
    return this.petRepository.find({ ownerId: ownerId });
  }
  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
