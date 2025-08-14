import {
  createPlugin,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';
import { UptimeRobotApiClient, uptimeRobotApiRef } from './api';

export const uptimerobotPlugin = createPlugin({
  id: 'uptimerobot',
  apis: [
    createApiFactory({
      api: uptimeRobotApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
      },
      factory: ({ discoveryApi }) =>
        new UptimeRobotApiClient({ discoveryApi }),
    }),
  ],
});

export const UptimeRobotPage = uptimerobotPlugin.provide(
  createRoutableExtension({
    name: 'UptimeRobotPage',
    component: () =>
      import('./components/UptimeRobotComponent').then(m => m.UptimeRobotComponent),
    mountPoint: '/uptimerobot',
  }),
);