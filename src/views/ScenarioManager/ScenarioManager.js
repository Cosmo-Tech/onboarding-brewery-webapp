// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { ScenarioManagerTreeList } from '@cosmotech/ui';
import { WORKSPACE_ID } from '../../config/AppInstance';
import { useTranslation } from 'react-i18next';
import { PERMISSIONS } from '../../services/config/Permissions';
import { PermissionsGate } from '../../components/PermissionsGate';
import { getFirstScenarioMaster } from '../../utils/SortScenarioListUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    margin: 'auto',
    height: '100%',
    width: '100%',
  },
}));

function moveScenario(moveData) {
  const scenarioId = moveData.node?.id;
  const newParentId = moveData.nextParentNode?.id;
  console.warn(
    'Trying to move scenario ' +
      scenarioId +
      ' under scenario ' +
      newParentId +
      '. This feature is not implemented yet.'
  );
}

const ScenarioManager = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { currentScenario, datasets, deleteScenario, findScenarioById, scenarios, resetCurrentScenario, userId } =
    props;

  const getScenariolistAfterDelete = (idOfScenarioToDelete) => {
    const scenarioListAfterDelete = scenarios
      .map((scenario) => {
        const newScenario = { ...scenario };
        if (newScenario.parentId === idOfScenarioToDelete) {
          newScenario.parentId = currentScenario.parentId;
        }
        return newScenario;
      })
      .filter((scenario) => scenario.id !== idOfScenarioToDelete);

    return scenarioListAfterDelete;
  };

  function onScenarioDelete(scenarioId) {
    const lastScenarioDelete = scenarios.length === 1;
    deleteScenario(WORKSPACE_ID, scenarioId);
    if (scenarioId === currentScenario.id) {
      if (lastScenarioDelete) {
        resetCurrentScenario();
      } else {
        findScenarioById(WORKSPACE_ID, getFirstScenarioMaster(getScenariolistAfterDelete(scenarioId)).id);
      }
    }
  }

  function buildDatasetLabel(datasetList) {
    return t('commoncomponents.scenariomanager.treelist.node.dataset', { count: datasetList?.length || 0 });
  }

  function buildScenarioNameToDelete(scenarioName) {
    return t('commoncomponents.dialog.confirm.delete.title', "Remove scenario '{{scenarioName}}'?", {
      scenarioName,
    });
  }

  const labels = {
    status: t('commoncomponents.scenariomanager.treelist.node.status.label'),
    successful: t('commoncomponents.scenariomanager.treelist.node.status.successful'),
    running: t('commoncomponents.scenariomanager.treelist.node.status.running'),
    failed: t('commoncomponents.scenariomanager.treelist.node.status.failed'),
    created: t('commoncomponents.scenariomanager.treelist.node.status.created'),
    deleteDialog: {
      description: t(
        'commoncomponents.dialog.confirm.delete.description',
        'The scenario will be deleted. If this scenario has children, ' +
          'then its parent will become the new parent of all these scenarios.'
      ),
      cancel: t('commoncomponents.dialog.confirm.delete.button.cancel', 'Cancel'),
      confirm: t('commoncomponents.dialog.confirm.delete.button.confirm', 'Confirm'),
    },
    searchField: t('commoncomponents.scenariomanager.treelist.node.text.search'),
    toolbar: {
      expandAll: t('commoncomponents.scenariomanager.toolbar.expandAll', 'Expand all'),
      collapseAll: t('commoncomponents.scenariomanager.toolbar.collapseAll', 'Collapse all'),
    },
  };

  return (
    <div className={classes.root}>
      <PermissionsGate
        noPermissionProps={{ showDeleteIcon: false }}
        authorizedPermissions={[PERMISSIONS.canDeleteScenario]}
      >
        <ScenarioManagerTreeList
          datasets={datasets}
          scenarios={scenarios}
          currentScenarioId={currentScenario?.id}
          userId={userId}
          deleteScenario={onScenarioDelete}
          moveScenario={moveScenario}
          buildDatasetInfo={buildDatasetLabel}
          labels={labels}
          buildScenarioNameToDelete={buildScenarioNameToDelete}
        />
      </PermissionsGate>
    </div>
  );
};

ScenarioManager.propTypes = {
  currentScenario: PropTypes.object,
  datasets: PropTypes.array.isRequired,
  deleteScenario: PropTypes.func.isRequired,
  findScenarioById: PropTypes.func.isRequired,
  scenarios: PropTypes.array.isRequired,
  resetCurrentScenario: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ScenarioManager;
