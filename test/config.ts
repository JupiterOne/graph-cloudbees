import { IntegrationInvocationConfig } from '@jupiterone/integration-sdk-core';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { invocationConfig } from '../src';
import { IntegrationConfig } from '../src/config';

if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}
const DEFAULT_USER_ID = 'dummy-acme-client-id';
const DEFAULT_API_KEY = 'dummy-acme-client-secret';
const DEFAULT_HOSTNAME = 'http://dummy-host-name/cjoc';

export const integrationConfig: IntegrationConfig = {
  userId: process.env.USER_ID || DEFAULT_USER_ID,
  apiKey: process.env.API_KEY || DEFAULT_API_KEY,
  hostname: process.env.HOSTNAME || DEFAULT_HOSTNAME,
};

export function buildStepTestConfigForStep(stepId: string): StepTestConfig {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: invocationConfig as IntegrationInvocationConfig,
  };
}
