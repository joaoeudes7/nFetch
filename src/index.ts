import { NConfig, NMethod } from './model/Config';
import NResponse from './model/NResponse';

export class nfetch {

  public configs: NConfig;

  constructor(configs = new NConfig()) {
    this.configs = Object.assign(new NConfig(), configs);
  }

  get = (url: string, configs?: NConfig) => this.onRequest("GET", url, null, configs);
  post = (url: string, body: object, configs?: NConfig) => this.onRequest("POST", url, body, configs);
  put = (url: string, body: object, configs?: NConfig) => this.onRequest("PUT", url, body, configs);
  patch = (url: string, body?: object, configs?: NConfig) => this.onRequest("PATCH", url, body, configs);
  head = (url: string, configs?: NConfig) => this.onRequest("HEAD", url, null, configs);
  options = (url: string, body?: object, configs?: NConfig) => this.onRequest("OPTIONS", url, body, configs);
  delete = (url: string, body?: object, configs?: NConfig) => this.onRequest("DELETE", url, body, configs);

  fromForm(url: string, formData: FormData) {
    return {
      post: this.post(url, { body: formData }),
      put: this.put(url, { body: formData }),
      patch: this.patch(url, { body: formData }),
      options: this.options(url, { body: formData }),
      delete: this.delete(url, { body: formData })
    }
  }

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
   * Create request default using fetch
   */
  private resolveOptions(method: NMethod, data: any, configs?: NConfig) {
    const body = data ? JSON.stringify(data) : null;

    let paramsRequest = Object.assign(this.configs, { method, body });

    if (!configs) {
      paramsRequest = Object.assign(paramsRequest, configs);
    }

    return paramsRequest;
  }

  /**
   * @param method Method of request
   * @param url Url of request
   * @param body Body of Request
   * @param configs Resolve custom configs
   */
  private async onRequest(method: NMethod, url: string, body?: any, configs = this.configs): Promise<NResponse> {
    const urlRequest = this.configs.prefixUrl + url;
    const options = this.resolveOptions(method, body, configs);

    const request = fetch(urlRequest, options);

    setTimeout(() => {
      this.resolveTimeout(options);
    }, this.configs.timeout);

    // Get response and return
    const res = await this.retry(request, configs.retryLimit!);

    return new NResponse(res, await res.json())
  }

  private async resolveTimeout(resInit: RequestInit) {
    const status = 408;
    const statusText = "Timeout";

    const _resInit = Object.assign(resInit, { status, statusText });
    const res = new Response(undefined, _resInit);

    throw new NResponse(res);
  }

  private async retry(request: Promise<Response>, limit: number) {
    try {
      return await request;
    } catch (error) {
      if (limit === 1) throw error;
      return await this.retry(request, limit - 1);
    }
  }
}

export default new nfetch();
