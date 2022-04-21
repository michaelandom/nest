import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenError } from '@casl/ability';
import {
  CheckAbility,
  CreateUserAbility,
  DeleteUserAbility,
  ReadUserAbility,
} from 'src/ability/abilities.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CheckAbility(new CreateUserAbility())
  create(@Body() createUserDto: CreateUserDto) {
    // const user = {
    //   id: 1,
    //   orgId: 0,
    //   isAdmin: false,
    // };
    // const ability = this.abilityFactory.defineAbilityFor(user);
    // // const isAllowed = ability.can(Action.Create, 'User');
    // // if (!isAllowed) {
    // //   throw new ForbiddenException('only admin can create user');
    // // }
    // // this is the same as above
    // try {
    //   ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
    //   return this.userService.create(createUserDto);
    // } catch (error) {
    //   if (error instanceof ForbiddenError) {
    //     throw new ForbiddenException(error.message);
    //   }
    // }
    return this.userService.create(createUserDto);
  }

  @Get()
  @CheckAbility(new ReadUserAbility())
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @CheckAbility(new ReadUserAbility())
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = {
      id: 1,
      orgId: 1,
      isAdmin: true,
    };

    try {
      return this.userService.update(+id, updateUserDto, user);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Delete(':id')
  @CheckAbility(new DeleteUserAbility())
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
