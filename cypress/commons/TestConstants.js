// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const TEST_CYPRESS = 'Test Cypress';

export const SCENARIO_NAME = {
  SCENARIO_MASTER: TEST_CYPRESS + ' Master - ',
  SCENARIO_CHILD: TEST_CYPRESS + ' Child - ',
  SCENARIO_WITH_BASIC_TYPES: TEST_CYPRESS + ' with basic types - ',
  OTHER_SCENARIO: TEST_CYPRESS + ' - another scenario'
};

export const BAR_PARAMETERS_RANGE = {
  STOCK: {
    MIN: 0,
    MAX: 9999
  },
  RESTOCK: {
    MIN: -1,
    MAX: 9999
  },
  WAITERS: {
    MIN: 0,
    MAX: 20
  }
};

export const BASIC_PARAMETERS_CONST = {
  NUMBER: {
    MIN: -999,
    MAX: 9999
  },
  ENUM: {
    USD: '$',
    EUR: '€',
    BTC: '฿',
    JPY: '¥'
  }
};

export const URL_ROOT = 'https://dev.api.cosmotech.com';

export const PAGE_NAME = {
  SCENARIO: '/scenario',
  SCENARIOS: '/scenarios',
  SIGN_IN: '/sign-in'
};

export const URL_REGEX = {
  WITHOUT_SUFFIX: new RegExp(`^${URL_ROOT}/.*${PAGE_NAME.SCENARIOS}`),
  WITH_UNKNOWN_ID_SCENARIO_SUFFIX: new RegExp(`^${URL_ROOT}/.*${PAGE_NAME.SCENARIOS}/.*`),
  WITH_RUN_SUFFIX: new RegExp(`^${URL_ROOT}/.*${PAGE_NAME.SCENARIOS}/.*/run`)
};

export const FILE_NAME = {
  DOC: 'doc.pdf'
};

export const DATASET = {
  BREWERY_ADT: 'Brewery ADT reference'
};

export const SCENARIO_TYPE = {
  BREWERY_PARAMETERS: 'Run template with Brewery parameters',
  BASIC_TYPES: 'Run template with mock basic types parameters'
};

export const SCENARIO_RUN_IN_PROGRESS = 'Scenario run in progress...';
