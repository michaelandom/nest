import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/pet.entity';
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

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail(id);
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return this.ownersRepository.delete(id);
  }

  getPets(id: number): Promise<Pet[]> {
    return this.petService.findPetByOwnerId(id);
  }
}
