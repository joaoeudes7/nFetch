import { Header } from "./Header";

export type RequestMethod = 'get' | 'post' | 'delete' | 'put'

export interface IConfig {
  baseUrl?: string;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: Headers;
  integrity?: string;
  keepalive?: boolean;
  method?: RequestMethod;
  mode?: RequestMode;
  referrerPolicy?: ReferrerPolicy;
  timeout?: number;
}

export class Config implements IConfig, RequestInit {
  baseUrl?: string;
  body?: BodyInit | null;
  cache: RequestCache = "default";
  credentials?: RequestCredentials;
  headers = new Headers();
  integrity?: string;
  keepalive?: boolean;
  method?: RequestMethod;
  mode: RequestMode = "cors";
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: any;
  timeout = 10000;

  constructor() {
    const headersDefaults = [
      new Header("Content-Type", "application/json")
    ]

    this.setHeaders(headersDefaults);
  }

  setHeaders(arrHeaders: Header[]) {
    arrHeaders.forEach(h => {
      this.headers.append(h.name, h.value)
    })
  }
}
