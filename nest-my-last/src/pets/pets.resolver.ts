import {
  Args,
  Mutation,
  Resolver,
  Query,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { of } from 'rxjs';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pets.entity';
import { PetsService } from './pets.service';

@Resolver((of) => Pet) // to tell graphql that this is a resolver for Pet
export class PetsResolver {
  constructor(private petsService: PetsService) {} // inject the service called PetsService

  // this is the resolver for the query
  // the resolver is the function that will be called when the query is called
  // the resolver will return the data that the query will return
  // the resolver will be called by graphql

  @Query((returns) => [Pet]) // to tell graphql that this is a query for Pet type and it will return an array of Pet type
  async getAllPets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }
  @Query((returns) => Pet) // to tell graphql that this is a query for Pet type
  async getPetById(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findById(id);
  }
  @Mutation((returns) => Pet) // to tell graphql that this is a query for Pet type
  async deletePetById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Pet> {
    return this.petsService.deleteById(id);
  }
  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
  @Mutation((returns) => Pet)
  async CreatePet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.CreatePets(createPetInput);
  }
  @Mutation((returns) => Pet)
  async UpdatePet(
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
  ): Promise<Pet> {
    return this.petsService.UpdatePet(updatePetInput.id, updatePetInput);
  }
}
