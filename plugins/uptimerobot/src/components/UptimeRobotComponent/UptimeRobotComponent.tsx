import React from 'react';
import { useAsync } from 'react-use';
import {
  Progress,
  ResponseErrorPanel,
  Table,
  TableColumn,
  StatusOK,
  StatusWarning,
  StatusError,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { uptimeRobotApiRef, Monitor } from '../../api';

const getStatusComponent = (status: number) => {
  switch (status) {
    case 2: // Up
      return <StatusOK>Up</StatusOK>;
    case 1: // Down
      return <StatusError>Down</StatusError>;
    case 0: // Paused
      return <StatusWarning>Paused</StatusWarning>;
    case 8: // Seems down
      return <StatusWarning>Seems Down</StatusWarning>;
    case 9: // Up
      return <StatusOK>Up</StatusOK>;
    default:
      return <StatusWarning>Unknown</StatusWarning>;
  }
};

const getMonitorType = (type: number) => {
  const types: { [key: number]: string } = {
    1: 'HTTP(s)',
    2: 'Keyword',
    3: 'Ping',
    4: 'Port',
    5: 'Heartbeat',
  };
  return types[type] || 'Unknown';
};

export const UptimeRobotComponent = () => {
  const uptimeRobotApi = useApi(uptimeRobotApiRef);

  const { loading, error, value } = useAsync(async () => {
    return uptimeRobotApi.getMonitors();
  }, []);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (!value || value.stat !== 'ok') {
    return (
      <ResponseErrorPanel 
        error={new Error(value?.error?.message || 'Failed to fetch monitors')} 
      />
    );
  }

  const columns: TableColumn[] = [
    {
      title: 'Name',
      field: 'friendly_name',
      highlight: true,
    },
    {
      title: 'URL',
      field: 'url',
      render: (rowData: Monitor) => (
        <a href={rowData.url} target="_blank" rel="noopener noreferrer">
          {rowData.url}
        </a>
      ),
    },
    {
      title: 'Type',
      field: 'type',
      render: (rowData: Monitor) => getMonitorType(rowData.type),
    },
    {
      title: 'Status',
      field: 'status',
      render: (rowData: Monitor) => getStatusComponent(rowData.status),
    },
    {
      title: 'Interval',
      field: 'interval',
      render: (rowData: Monitor) => `${rowData.interval}s`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <Typography variant="h5">UptimeRobot Monitors</Typography>
        <Typography variant="body2" color="textSecondary">
          Monitor status overview from UptimeRobot
        </Typography>
      </CardHeader>
      <CardContent>
        <Table
          title={`Monitors (${value.monitors.length})`}
          options={{
            search: true,
            paging: true,
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50],
          }}
          columns={columns}
          data={value.monitors}
        />
      </CardContent>
    </Card>
  );
};