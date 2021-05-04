// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { SCENARIO_ENDPOINT, SCENARIO_ACTIONS_KEY } from '../../../commons/ScenarioConstants';
import { ScenarioUtils } from '@cosmotech/core';

// generators function
export function * fetchScenarioTreeData (workspaceId) {
  try {
    // yield keyword is here to milestone and save the action
    const { data } = yield axios.get(SCENARIO_ENDPOINT.GET_SCENARIO_TREE, { params: { workspaceId: workspaceId } });
    // Here is an effect named put that indicate to the middleware that it can dispatch a SET_SCENARIO_TREE action with data as payload
    const scenarioTree = ScenarioUtils.getScenarioTree(data);
    yield put({ type: SCENARIO_ACTIONS_KEY.SET_SCENARIO_TREE, tree: scenarioTree });
  } catch (error) {
    console.log(error);
  }
}

// generators function
// Here is a watcher that take EVERY action dispatched named GET_SCENARIO_LIST and bind getAllScenariosData saga to it
function * getScenariosTreeData () {
  yield takeEvery(SCENARIO_ACTIONS_KEY.GET_SCENARIO_TREE, fetchScenarioTreeData);
}

export default getScenariosTreeData;
