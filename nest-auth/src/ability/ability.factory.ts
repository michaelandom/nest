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
    if (user.isAdmin) {
      can(Action.Manage, 'all'); //can manage all
      cannot(Action.Manage, User, { orgId: { $ne: user.orgId } }).because(
        'you can only manage users in your own organization',
      ); //cannot manage other org
    } else {
      //   can(Action.Create, 'all'); //can create all
      can(Action.Read, User); //can read all
      cannot(Action.Create, User).because(
        'your special message: only admins!!',
      ); //cannot create all
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
