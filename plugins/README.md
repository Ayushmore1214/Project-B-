# UptimeRobot Plugin for Backstage

This plugin integrates UptimeRobot monitoring into Backstage, allowing you to view monitor statuses directly in your Backstage instance.

## Features

- Display UptimeRobot monitor statuses
- Real-time status updates
- Monitor details including name, URL, type, and status
- Search and pagination support

## Installation

### Backend Plugin

1. Install the backend plugin package:
```bash
cd packages/backend
yarn add @internal/plugin-uptimerobot-backend
```

2. Add the plugin to your backend in `packages/backend/src/index.ts`:
```typescript
import { uptimerobotPlugin } from '@internal/plugin-uptimerobot-backend';

const backend = createBackend();
backend.add(uptimerobotPlugin);
```

### Frontend Plugin

1. Install the frontend plugin package:
```bash
cd packages/app
yarn add @internal/plugin-uptimerobot
```

2. Add the plugin to your app in `packages/app/src/App.tsx`:
```typescript
import { UptimeRobotPage } from '@internal/plugin-uptimerobot';

// In your app routes
<Route path="/uptimerobot" element={<UptimeRobotPage />} />
```

## Configuration

Add the following to your `app-config.yaml`:

```yaml
uptimerobot:
  apiKey: ${UPTIMEROBOT_API_KEY}

proxy:
  '/uptimerobot':
    target: http://localhost:7007
    changeOrigin: true
    pathRewrite:
      '^/api/proxy/uptimerobot/?': '/uptimerobot/'
```

Set your UptimeRobot API key as an environment variable:
```bash
export UPTIMEROBOT_API_KEY=your_api_key_here
```

## Usage

Once installed and configured, navigate to `/uptimerobot` in your Backstage instance to view your UptimeRobot monitors.

The interface displays:
- Monitor name
- Monitor URL (clickable)
- Monitor type (HTTP, Ping, etc.)
- Current status (Up, Down, Paused)
- Check interval

## API

The plugin provides a REST API endpoint:

- `GET /api/uptimerobot/monitors` - Returns all monitors from UptimeRobot

## Development

To work on this plugin:

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start development: `yarn dev`

### Backend Development
```bash
cd plugins/uptimerobot-backend
yarn start
```

### Frontend Development
```bash
cd plugins/uptimerobot
yarn start
```

## License

Licensed under the Apache License, Version 2.0.