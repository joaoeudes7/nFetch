import { IConfig } from './model/IConfigs';
import { Response, STATUS, METHOD } from './model/Response';

export class nfetch {

  public configs: IConfig = {
    timeout: 10000,
    redirect: 'follow',
    headers: new Headers()
  };

  constructor(configs?: IConfig) {
    this.configs = Object.assign(this.configs, configs);
  }

  get = (url: string, configs?: IConfig) => this.request(METHOD.GET, url, undefined, configs);
  post = (url: string, data: object, configs?: IConfig) => this.request(METHOD.POST, url, data, configs);
  delete = (url: string, data?: object, configs?: IConfig) => this.request(METHOD.DELETE, url, data, configs);
  put = (url: string, data: object, configs?: IConfig) => this.request(METHOD.PUT, url, data, configs);

  public async all(requests: Array<Promise<Response>>): Promise<Response[]> {
    const data: Response[] = [];

    try {
      requests.forEach(async (req) => {
        data.push(await req);
      });
    } catch (error) {
      return error
    }

    return data;
  }

  private requestFactory(method: METHOD, data: any, configs: any) {
    const body = JSON.stringify(data);
    const headers = configs.headers;

    return { method, body, headers };
  }

  private async request(method: METHOD, url: string, body?: any, configs = this.configs): Promise<Response> {
    const request = this.requestFactory(method, body, configs);

    const initTimeout = setTimeout(() => {
      return new Response(request.headers, STATUS.TIMEOUT, {})
    }, configs.timeout);

    // Get response
    const res = await fetch(url, request);
    const data = await res.json();

    // Cancell timeout
    clearTimeout(initTimeout);

    return new Response(res.headers, res.status, data);
  }}


export default new nfetch();
