import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pets.entity';
import { PetsService } from 'src/pets/pets.service';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService))
    private petService: PetsService,
  ) {}
  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const owner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(owner);
  }

  async findAllOwner(): Promise<Owner[]> {
    // if (name) {
    //   return this.ownersRepository.find({ name: name });
    // }
    return this.ownersRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    const owner = this.ownersRepository.findOneOrFail(id);
    if (!owner) {
    }
    return owner;
  }
  async findOwnerPets(ownerId: number): Promise<Pet[]> {
    return this.petService.findByOwnerId(ownerId);
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const owner = await this.ownersRepository.findOneOrFail(id);
    if (updateOwnerInput.name) {
      owner.name = updateOwnerInput.name;
    }
    this.ownersRepository.update(id, owner);
    return owner;
  }

  async remove(id: number): Promise<Owner> {
    const owner = await this.ownersRepository.findOneOrFail(id);
    this.ownersRepository.delete(owner);
    return owner;
  }
}
