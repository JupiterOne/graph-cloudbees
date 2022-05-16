import {
  createIntegrationEntity,
  createDirectRelationship,
  Entity,
  RelationshipClass,
  Relationship,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { CloudBeesGroup, CloudBeesRole, CloudBeesUser } from '../../types';

export function createUserKey(id: string): string {
  return `cloudbees_user:${id}`;
}

export function createGroupKey(id: string): string {
  return `cloudbees_group:${id}`;
}

export function createRoleKey(id: string): string {
  return `cloudbees_role:${id}`;
}

export function createUserEntity(user: CloudBeesUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        _key: createUserKey(user.user.id),
        name: user.user.fullName,
        displayName: user.user.fullName,
        username: user.user.fullName,
        webLink: user.user.absoluteUrl,
        description: user.user.description || undefined,
        active: true,
      },
    },
  });
}

export function createGroupEntity(
  group: CloudBeesGroup,
  hostname: string,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _type: Entities.GROUP._type,
        _class: Entities.GROUP._class,
        _key: createGroupKey(group.name),
        description: group.description || undefined,
        displayName: group.name,
        name: group.name,
        roles: group.roles,
        webLink: `${hostname}/${group.url}`,
        users: group.users,
      },
    },
  });
}

export function createRoleEntity(
  role: CloudBeesRole,
  hostname: string,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _type: Entities.ROLE._type,
        _class: Entities.ROLE._class,
        _key: createRoleKey(role.id),
        username: role.id,
        name: role.id,
        description: role.description || undefined,
        webLink: `${hostname}/roles/${role.shortUrl}`,
        id: role.id,
        grantedPermissions: role.grantedPermissions,
        filterable: role.filterable,
      },
    },
  });
}

export function createAccountUserRelationship(
  account: Entity,
  user: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: user,
  });
}

export function createAccountGroupRelationship(
  account: Entity,
  group: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: group,
  });
}

export function createAccountRoleRelationship(
  account: Entity,
  role: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: role,
  });
}

export function createGroupUserRelationship(
  group: Entity,
  user: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: group,
    to: user,
  });
}

export function createGroupRoleRelationship(
  group: Entity,
  role: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: group,
    to: role,
  });
}
