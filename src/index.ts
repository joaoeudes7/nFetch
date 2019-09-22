import { Response } from './model/Response';
import { Config, IConfig, Method } from './model/Config';

export class nfetch {

  public configs = new Config();

  constructor(configs?: IConfig) {
    this.configs = Object.assign(this.configs, configs);
  }

  get = (url: string, configs?: IConfig) => this.onRequest(Method.get, url, undefined, configs);
  delete = (url: string, data?: object, configs?: IConfig) => this.onRequest(Method.delete, url, data, configs);
  post = (url: string, data: object, configs?: IConfig) => this.onRequest(Method.post, url, data, configs);
  put = (url: string, data: object, configs?: IConfig) => this.onRequest(Method.put, url, data, configs);

  public async all(requests: Array<Promise<Response>>): Promise<Response[]> {
    let data: Response[] = [];

    for (let req of requests) {
      data.push(await req);
    }

    return data;
  }

  private requestFactory(method: Method, data: any, configs?: IConfig): RequestInit {
    const body = JSON.stringify(data);
    let _request = Object.assign(this.configs, { method, body })

    if (configs != null) {
      _request = Object.assign(_request, { ...configs });
    }

    return _request
  }

  private async onRequest(method: Method, url: string, body?: any, configs?: IConfig): Promise<Response> {
    const request = this.requestFactory(method, body, configs);

    const initTimeout = setTimeout(() => {
      const status = 408;

      throw new Response(status, url, {}, headers)
    }, this.configs.timeout);

    // Get response
    const res = await fetch(url, request);
    const data = await res.json();
    const { status, headers } = res;

    // Cancell timeout
    clearTimeout(initTimeout);

    return new Response(status, url, data, headers);
  }}


export default new nfetch();
