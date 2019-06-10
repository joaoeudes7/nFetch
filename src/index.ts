import { IConfig } from './model/IConfigs';
import { Response, STATUS, METHOD } from './model/Response';

export class nfetch {

  public configs: IConfig = {
    timeout: 10000,
    redirect: 'follow',
    headers: [
      { 'Content-Type': 'application/json' },
      { 'Accept': 'application/json' }
    ]
  };

  constructor(configs?: IConfig) {
    this.configs = { ...this.configs, ...configs };
  };

  private requestFactory(method: METHOD, data: any, configs: any) {
    const body = JSON.stringify(data);
    const headers = configs.headers;

    return { method, body, headers };
  }

  private async request (method: METHOD, url: string, _data?: object, configs = this.configs): Promise<Response> {
    const request = this.requestFactory(method, _data, configs)

    const initTimeout = setTimeout(() => new Response(request.headers, STATUS.TIMEOUT, {}), configs.timeout);

    // Get response
    const res = await fetch(url, request);
    const data = await res.json();

    // Cancell timeout
    clearTimeout(initTimeout);

    return new Response(res.headers, res.status, data);
  };

  get(url: string, configs?: IConfig) {
    return this.request(METHOD.GET, url, undefined, configs);
  };

  post(url: string, data: object, configs?: IConfig) {
    return this.request(METHOD.POST, url, data, configs);
  };

  delete(url: string, data?: object, configs?: IConfig) {
    return this.request(METHOD.DELETE, url, data, configs);
  };

  put(url: string, data: object, configs?: IConfig) {
    return this.request(METHOD.PUT, url, data, configs);
  };

  async all(requests: Promise<Response>[]): Promise<Response[]> {
    const data: Response[] = [];
    for (let index = 0; index < requests.length; index++) {
      data.push(await requests[index]);
    }

    return data;
  }
}


export default new nfetch();
