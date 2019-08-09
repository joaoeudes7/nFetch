import { Header } from "./Header";

export enum Method {
  get = 'get',
  post = 'post',
  delete = 'delete',
  put = 'put'
}

export class Config implements RequestInit {
  body?: BodyInit | null;
  cache?: RequestCache = "default";
  credentials?: RequestCredentials;
  headers = new Headers();
  integrity?: string;
  keepalive?: boolean;
  method?: Method;
  mode?: RequestMode = "cors";
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
