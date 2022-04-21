import { ForbiddenError } from '@casl/ability';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private abilityFactory: AbilityFactory) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    const user = new User();
    user.id = id;
    user.orgId = 0;
    user.isAdmin = false;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto, currontUser: User) {
    const ability = this.abilityFactory.defineAbilityFor(currontUser);

    const userUpdate = this.findOne(+id);
    ForbiddenError.from(ability).throwUnlessCan(Action.Update, userUpdate);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
