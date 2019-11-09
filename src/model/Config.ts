export type NMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'HEAD' | 'PATCH' | 'OPTIONS';

export class NConfig implements RequestInit {
  prefixUrl: string = "";
  integrity?: string;
  keepalive?: boolean;
  credentials?: RequestCredentials;
  cache: RequestCache = "default";
  mode: RequestMode = "cors";
  redirect: RequestRedirect = "follow";
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  retryLimit = 3;
  window?: any;
  timeout = 10000;
  headers: HeadersInit = {
    'Content-Type': 'text/json'
  };

  interceptEvent?: (res: Response) => any
}
