import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

/**
 * A type describing the configuration fields required to execute the
 * integration for a specific account in the data provider.
 *
 * When executing the integration in a development environment, these values may
 * be provided in a `.env` file with environment variables. For example:
 *
 * - `CLIENT_ID=123` becomes `instance.config.clientId = '123'`
 * - `CLIENT_SECRET=abc` becomes `instance.config.clientSecret = 'abc'`
 *
 * Environment variables are NOT used when the integration is executing in a
 * managed environment. For example, in JupiterOne, users configure
 * `instance.config` in a UI.
 */
export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  userId: {
    type: 'string',
  },
  hostname: {
    type: 'string',
  },
  apiKey: {
    type: 'string',
    mask: true,
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The CloudBees user ID used to authenticate requests.
   */
  userId: string;

  /**
   * The CloudBees API key used to authenticate requests.
   */
  apiKey: string;

  /**
   * The CloudBees hostname.
   */
  hostname: string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (!config.userId || !config.apiKey || !config.hostname) {
    throw new IntegrationValidationError(
      'Config requires all of {userId, apiKey, hostname}',
    );
  }

  const regEx: RegExp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\/cjoc$/g;

  if (!regEx.test(config.hostname)) {
    throw new IntegrationValidationError(
      'The hostname value is of an invalid format (valid: http(s)://ip-hostname/cjoc).',
    );
  }

  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}
