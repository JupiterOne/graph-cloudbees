import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  GROUPS: 'fetch-groups',
  ROLES: 'fetch-roles',
  GROUP_USER_RELATIONSHIPS: 'build-user-group-relationships',
  GROUP_ROLE_RELATIONSHIPS: 'build-group-role-relationships',
};

export const Entities: Record<
  'ACCOUNT' | 'GROUP' | 'USER' | 'ROLE',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'cloudbees_account',
    _class: ['Account'],
    schema: {
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
  },
  GROUP: {
    resourceName: 'UserGroup',
    _type: 'cloudbees_group',
    _class: ['UserGroup'],
    schema: {
      properties: {
        description: { type: 'string' },
        displayName: { type: 'string' },
        name: { type: 'string' },
        roles: { type: 'array', items: { type: 'string' } },
        webLink: { type: 'string' },
        users: { type: 'array', items: { type: 'string' } },
      },
      required: ['name', 'roles', 'users'],
    },
  },
  USER: {
    resourceName: 'User',
    _type: 'cloudbees_user',
    _class: ['User'],
    schema: {
      properties: {
        name: { type: 'string' },
        displayName: { type: 'string' },
        username: { type: 'string' },
        webLink: { type: 'string' },
        description: { type: 'string' },
        active: { type: 'boolean' },
      },
      required: ['username', 'active', 'name', 'displayName'],
    },
  },
  ROLE: {
    resourceName: 'Role',
    _type: 'cloudbees_role',
    _class: ['AccessRole'],
    schema: {
      properties: {
        username: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        webLink: { type: 'string' },
        id: { type: 'string' },
        grantedPermissions: { type: 'array', items: { type: 'string' } },
        filterable: { type: 'boolean' },
      },
      required: [
        'username',
        'name',
        'description',
        'username',
        'id',
        'grantedPermissions',
        'filterable',
      ],
    },
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_USER'
  | 'ACCOUNT_HAS_GROUP'
  | 'GROUP_HAS_USER'
  | 'GROUP_ASSIGNED_ROLE'
  | 'ACCOUNT_HAS_ROLE',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'cloudbees_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_GROUP: {
    _type: 'cloudbees_account_has_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  ACCOUNT_HAS_ROLE: {
    _type: 'cloudbees_account_has_role',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ROLE._type,
  },
  GROUP_HAS_USER: {
    _type: 'cloudbees_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  GROUP_ASSIGNED_ROLE: {
    _type: 'cloudbees_group_assigned_role',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ROLE._type,
  },
};
