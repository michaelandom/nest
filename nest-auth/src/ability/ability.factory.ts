import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { linkedItem } from '@casl/ability/dist/types/structures/LinkedItem';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export enum Action {
  Manage = 'manage', //wildcard for all actions
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all'; // subjects can be either a single subject or an array of subjects
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbilityFor(user: User): any {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    can(Action.Manage, 'all');
    if (user.isAdmin) {
      can(Action.Manage, 'all'); //can manage all
    } else {
      //   can(Action.Create, 'all'); //can create all
      can(Action.Read, 'all'); //can read all
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
