import { Response } from './model/Response';
import { Config, IConfig, RequestMethod } from './model/Config';

export class nfetch {

  public configs: IConfig = new Config();

  constructor(configs?: IConfig) {
    this.configs = Object.assign(new Config(), configs);
  }

  get = (url: string, configs?: IConfig) => this.onRequest("get", url, undefined, configs);
  delete = (url: string, data?: object, configs?: IConfig) => this.onRequest("delete", url, data, configs);
  post = (url: string, data: object, configs?: IConfig) => this.onRequest("post", url, data, configs);
  put = (url: string, data: object, configs?: IConfig) => this.onRequest("put", url, data, configs);

  /**
   * Used to resolve multi-requests async
   * @param requests Array with requests created by nfetch
   */
  public async all(requests: Array<Promise<Response>>): Promise<Response[]> {
    let data: Response[] = [];

    for (let req of requests) {
      data.push(await req);
    }

    return data;
  }

  /**
   * RequestInit is default used in fetch
   */
  private createRequestInit(method: RequestMethod, data: any, customConfig?: IConfig): RequestInit {
    const body = JSON.stringify(data);

    let paramsRequest = Object.assign(this.configs, { method, body });

    if (customConfig != null) {
      paramsRequest = Object.assign(paramsRequest, customConfig);
    }

    return paramsRequest;
  }

  private async onRequest(method: RequestMethod, url: string, body?: any, configs?: IConfig): Promise<Response> {
    const request = this.createRequestInit(method, body, configs);
    const pathRequest = this.configs.baseUrl + url;

    const initTimeout = setTimeout(() => {
      const status = 408;
      const headers = this.configs.headers;

      throw new Response(status, pathRequest, {}, headers);
    }, this.configs.timeout);

    // Get response
    const res = await fetch(pathRequest, request);
    const data = await res.json();
    const { status, headers } = res;

    // Cancell timeout
    clearTimeout(initTimeout);

    return new Response(status, pathRequest, data, headers);
  }
}

export default new nfetch();
