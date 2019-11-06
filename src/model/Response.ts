import { RequestMethod } from "./Config";

export class Response {
  url: string;
  data?: any;
  status: number;
  headers?: Headers;
  method: string;

  constructor(method: RequestMethod, status: number,  url: string, data?: any, headers?: Headers) {
    this.method = method;
    this.status = status;
    this.url = url;
    this.data = data;
    this.headers = headers;
  }

  /**
   * Funcional only in Typescript
   */
  public toObject<T>() {
    return Object.assign({} as T, this.data);
  }
}
