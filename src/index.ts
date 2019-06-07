import { IConfig } from './model/IConfigs';
import { IResponse } from './model/IResponse';

enum STATUS {
  TIMEOUT = 408
}

export class nfetch {

  private configs: IConfig = {
    timeout: 10000,
    redirect: 'follow',
    headers: [
      { 'Content-Type': 'application/json' },
      { 'Accept': 'application/json' }
    ]
  };

  constructor(configs?: IConfig) {
    this.configs = Object.assign(this.configs, configs);
  };

  private generateRequest = async (method: string, url: string, _data?: object, configs = this.configs) => {
    const requestInit = {
      method,
      body: JSON.stringify(_data),
      headers: configs.headers
    };

    const timeout = setTimeout(() => {
      new Error('Request timed out');
      return { headers: requestInit.headers, status: STATUS.TIMEOUT, data: null }
    }, configs.timeout);

    // Get response
    const res = await fetch(url, requestInit);
    const data = await res.json();

    // Cancell timeout
    clearTimeout(timeout);

    const { headers, status } = res;
    return { headers, status, data };
  };

  get(url: string, configs?: IConfig) {
    return this.generateRequest("GET", url, undefined, configs);
  };

  post(url: string, data: object, configs?: IConfig) {
    return this.generateRequest("POST", url, data, configs);
  };

  delete(url: string, data?: object, configs?: IConfig) {
    return this.generateRequest("DELETE", url, data, configs);
  };

  put(url: string, data?: object, configs?: IConfig) {
    return this.generateRequest("PUT", url, data, configs);
  };

  async all(requests: Promise<IResponse>[]) {
    const data: IResponse[] = [];
    for (let index = 0; index < requests.length; index++) {
      data.push(await requests[index]);
    }

    return data;
  }
}


export default new nfetch();
