// Basic type stubs for validation
declare module '@backstage/backend-plugin-api' {
  export interface LoggerService {
    info(message: string): void;
    error(message: string, error?: any): void;
  }
  
  export const coreServices: {
    httpRouter: any;
    logger: any;
    rootConfig: any;
  };
  
  export function createBackendPlugin(options: any): any;
}

declare module '@backstage/config' {
  export interface Config {
    getString(key: string): string;
  }
}

declare module '@backstage/errors' {
  export class InputError extends Error {}
}

declare module 'express' {
  interface Router {}
  function express(): any;
  namespace express {
    interface Request {}
    interface Response {
      json(data: any): void;
      status(code: number): Response;
    }
  }
  export = express;
}

declare module 'express-promise-router' {
  function Router(): any;
  export = Router;
}

declare module 'node-fetch' {
  function fetch(url: string, options?: any): Promise<any>;
  export = fetch;
}