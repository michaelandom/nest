import { SetMetadata } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Action, Subjects } from './ability.factory';
export const CHECK_ABILITY = 'check_ability';
export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CheckAbility = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRule {
  action = Action.Read;
  subject = User;
}

export class DeleteUserAbility implements RequiredRule {
  action = Action.Delete;
  subject = User;
}
export class CreateUserAbility implements RequiredRule {
  action = Action.Create;
  subject = User;
}
