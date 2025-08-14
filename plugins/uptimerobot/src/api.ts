import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';

/**
 * Monitor data structure from UptimeRobot API
 */
export interface Monitor {
  id: number;
  friendly_name: string;
  url: string;
  status: number;
  type: number;
  keyword_type?: number;
  keyword_value?: string;
  http_username?: string;
  http_password?: string;
  port?: number;
  interval: number;
  timeout?: number;
  create_datetime: number;
}

/**
 * Response from UptimeRobot API
 */
export interface UptimeRobotResponse {
  stat: string;
  pagination?: {
    offset: number;
    limit: number;
    total: number;
  };
  monitors: Monitor[];
  error?: {
    type: string;
    message: string;
  };
}

/**
 * API client for UptimeRobot backend
 */
export interface UptimeRobotApi {
  /**
   * Fetch all monitors from UptimeRobot
   */
  getMonitors(): Promise<UptimeRobotResponse>;
}

/**
 * Implementation of the UptimeRobot API client
 */
export class UptimeRobotApiClient implements UptimeRobotApi {
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  async getMonitors(): Promise<UptimeRobotResponse> {
    const baseUrl = await this.discoveryApi.getBaseUrl('proxy');
    const response = await fetch(`${baseUrl}/uptimerobot/monitors`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch monitors: ${response.status} ${errorText}`);
    }

    return response.json();
  }
}

/**
 * API reference for the UptimeRobot API
 */
export const uptimeRobotApiRef = createApiRef<UptimeRobotApi>({
  id: 'plugin.uptimerobot.service',
});