import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { InputError } from '@backstage/errors';
import express from 'express';
import Router from 'express-promise-router';
import fetch from 'node-fetch';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const router = Router();
  router.use(express.json());

  const apiKey = config.getString('uptimerobot.apiKey');
  if (!apiKey) {
    throw new InputError('UptimeRobot API key is required');
  }

  router.get('/monitors', async (req, res) => {
    try {
      logger.info('Fetching monitors from UptimeRobot API');

      const response = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_key: apiKey,
          format: 'json',
          logs: '1',
        }),
      });

      if (!response.ok) {
        logger.error(`UptimeRobot API error: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({
          error: 'Failed to fetch monitors from UptimeRobot',
          status: response.status,
        });
      }

      const data = await response.json();
      
      if (data.stat !== 'ok') {
        logger.error(`UptimeRobot API returned error: ${data.error?.message}`);
        return res.status(400).json({
          error: data.error?.message || 'UptimeRobot API error',
        });
      }

      logger.info(`Successfully fetched ${data.monitors?.length || 0} monitors`);
      res.json(data);
    } catch (error) {
      logger.error('Error fetching monitors:', error);
      res.status(500).json({
        error: 'Internal server error while fetching monitors',
      });
    }
  });

  router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return router;
}