import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const accessSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /asynchPeople/api/json/?depth=2
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'cloudbees_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'cloudbees_account_has_user',
        sourceType: 'cloudbees_account',
        _class: RelationshipClass.HAS,
        targetType: 'cloudbees_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: /groups/api/json/?depth=2
     * PATTERN: Fetch Entities
     */
    id: 'fetch-groups',
    name: 'Fetch Groups',
    entities: [
      {
        resourceName: 'UserGroup',
        _type: 'cloudbees_group',
        _class: ['UserGroup'],
      },
    ],
    relationships: [
      {
        _type: 'cloudbees_account_has_group',
        sourceType: 'cloudbees_account',
        _class: RelationshipClass.HAS,
        targetType: 'cloudbees_group',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: /roles/api/json/?depth=1
     * PATTERN: Fetch Entities
     */
    id: 'fetch-roles',
    name: 'Fetch Roles',
    entities: [
      {
        resourceName: 'Role',
        _type: 'cloudbees_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [
      {
        _type: 'cloudbees_account_has_role',
        sourceType: 'cloudbees_account',
        _class: RelationshipClass.HAS,
        targetType: 'cloudbees_role',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build Child Relationships
     */
    id: 'build-user-group-relationships',
    name: 'Build Group -> User Relationships',
    entities: [],
    relationships: [
      {
        _type: 'cloudbees_group_has_user',
        sourceType: 'cloudbees_group',
        _class: RelationshipClass.HAS,
        targetType: 'cloudbees_user',
      },
    ],
    dependsOn: ['fetch-groups', 'fetch-users'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build Child Relationships
     */
    id: 'build-group-role-relationships',
    name: 'Build Group -> Role Relationships',
    entities: [],
    relationships: [
      {
        _type: 'cloudbees_group_assigned_role',
        sourceType: 'cloudbees_group',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'cloudbees_role',
      },
    ],
    dependsOn: ['fetch-groups', 'fetch-roles'],
    implemented: true,
  },
];
