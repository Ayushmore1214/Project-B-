# UptimeRobot Plugin Example Configuration

## Environment Variables

Create a `.env` file or set these environment variables:

```bash
# UptimeRobot API Key (get from https://uptimerobot.com/dashboard#mySettings)
UPTIMEROBOT_API_KEY=m778918918-XXXXXXXXXXXXXXXXXXXX
```

## app-config.yaml Example

```yaml
# Full example configuration
app:
  title: Backstage with UptimeRobot
  baseUrl: http://localhost:3000

backend:
  baseUrl: http://localhost:7007
  listen:
    port: 7007
  cors:
    origin: http://localhost:3000

# UptimeRobot Configuration
uptimerobot:
  apiKey: ${UPTIMEROBOT_API_KEY}

# Proxy Configuration
proxy:
  '/uptimerobot':
    target: http://localhost:7007
    changeOrigin: true
    pathRewrite:
      '^/api/proxy/uptimerobot/?': '/uptimerobot/'
```

## Installation in Existing Backstage App

### 1. Backend Integration

In `packages/backend/src/index.ts`:

```typescript
import { createBackend } from '@backstage/backend-defaults';
import { uptimerobotPlugin } from '@internal/plugin-uptimerobot-backend';

const backend = createBackend();

// Add UptimeRobot backend plugin
backend.add(uptimerobotPlugin);

backend.start();
```

### 2. Frontend Integration

In `packages/app/src/App.tsx`:

```typescript
import { UptimeRobotPage } from '@internal/plugin-uptimerobot';

// Add to your routes
<Route path="/uptimerobot" element={<UptimeRobotPage />} />
```

In `packages/app/src/components/Root/Root.tsx`:

```typescript
// Add to sidebar navigation
<SidebarItem icon={ExtensionIcon} to="uptimerobot" text="UptimeRobot" />
```

## API Endpoints

### Backend API

- `GET /api/uptimerobot/monitors` - Fetch all monitors
- `GET /api/uptimerobot/health` - Health check

### Response Format

```json
{
  "stat": "ok",
  "pagination": {
    "offset": 0,
    "limit": 50,
    "total": 10
  },
  "monitors": [
    {
      "id": 777749809,
      "friendly_name": "My Website",
      "url": "https://example.com",
      "type": 1,
      "status": 2,
      "interval": 300,
      "create_datetime": 1571854340
    }
  ]
}
```

## Status Codes

- **0**: Paused
- **1**: Not checked yet  
- **2**: Up
- **8**: Seems down
- **9**: Down

## Monitor Types

- **1**: HTTP(s)
- **2**: Keyword
- **3**: Ping
- **4**: Port
- **5**: Heartbeat

## Usage

1. Start your Backstage backend: `yarn workspace backend start`
2. Start your Backstage frontend: `yarn workspace app start`
3. Navigate to `/uptimerobot` in your Backstage instance
4. View your monitor statuses in a table format with search and pagination

## Troubleshooting

### Common Issues

1. **API Key not working**: Ensure your UptimeRobot API key is valid and has sufficient permissions
2. **Proxy errors**: Check that the proxy configuration in app-config.yaml is correct
3. **CORS issues**: Ensure backend CORS settings allow frontend domain

### Debug Mode

Add logging to backend plugin:

```yaml
backend:
  log:
    level: debug
```

### API Testing

Test the backend directly:

```bash
curl -X GET "http://localhost:7007/uptimerobot/monitors"
```