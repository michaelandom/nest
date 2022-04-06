import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from 'src/pets/entities/pets.entity';
import { Query as Q } from '@nestjs/common';
import { FilterOwnerInput } from './dto/filter-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner])
  findAllOwner(@Args('FilterOwnerInput') filterOwnerInput?: FilterOwnerInput) {
    if (filterOwnerInput) {
      return this.ownersService.findAllOwner(filterOwnerInput.name);
    }
    return this.ownersService.findAllOwner();
  }

  @Query(() => Owner)
  findByIdOneOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @ResolveField(() => [Pet])
  pet(@Parent() owner: Owner): Promise<Pet[]> {
    return this.ownersService.findOwnerPets(owner.id);
  }
  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
