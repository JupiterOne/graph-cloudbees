import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';

export function createAccountEntity(account: { hostname: string }): Entity {
  return createIntegrationEntity({
    entityData: {
      source: account,
      assign: {
        _key: `cloudbees_account:${account.hostname}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: account.hostname,
        webLink: account.hostname,
      },
    },
  });
}
