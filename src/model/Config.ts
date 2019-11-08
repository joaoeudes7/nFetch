export type RequestMethod = 'get' | 'post' | 'delete' | 'put' | 'head' | 'patch' | 'options';

export class NConfig implements RequestInit {
  baseUrl?: string;
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
}
