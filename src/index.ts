import { NResponse, NTimeout } from './model/Response';
import { NConfig, RequestMethod } from './model/Config';

export class nfetch {

  public configs: NConfig;

  constructor(configs = new NConfig(), public interceptEvent?: () => Response) {
    this.configs = Object.assign(new NConfig(), configs);
  }

  get = (url: string, body?: object, configs?: NConfig) => this.onRequest("get", url, body, configs);
  post = (url: string, body: object, configs?: NConfig) => this.onRequest("post", url, body, configs);
  put = (url: string, body: object, configs?: NConfig) => this.onRequest("put", url, body, configs);
  patch = (url: string, body?: object, configs?: NConfig) => this.onRequest("patch", url, body, configs);
  head = (url: string, body?: object, configs?: NConfig) => this.onRequest("head", url, body, configs);
  options = (url: string, body?: object, configs?: NConfig) => this.onRequest("options", url, body, configs);
  delete = (url: string, body?: object, configs?: NConfig) => this.onRequest("delete", url, body, configs);

  fromForm(url: string, formData: FormData) {
    return {
      post: this.post(url, { body: formData }),
      put: this.put(url, { body: formData }),
      patch: this.patch(url, { body: formData }),
      options: this.options(url, { body: formData }),
      delete: this.delete(url, { body: formData }),
      head: this.head(url, { body: formData }),
    }
  }

  /**
   * Used to resolve multi-requests async
   * @param requests Array with requests created by nfetch
   */
  public async all(requests: Array<Promise<NResponse>>): Promise<NResponse[]> {
    let data: NResponse[] = [];

    for (let req of requests) {
      data.push(await req);
    }

    return data;
  }

  /**
   * Create request default using fetch
   */
  private resolveOptions(method: RequestMethod, data: any, configs?: NConfig) {
    const body = JSON.stringify(data);

    let paramsRequest = Object.assign(this.configs, { method, body });

    if (configs != null) {
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
  private async onRequest(method: RequestMethod, url: string, body?: any, configs = this.configs): Promise<NResponse> {
    const urlRequest = this.configs.baseUrl + url;
    const options = this.resolveOptions(method, configs);
    const request = fetch(urlRequest, options);

    setTimeout(() => {
      throw new NTimeout(options, method);
    }, this.configs.timeout);

    // Get response
    const res = await this.retry(request, configs.retryLimit);

    return new NResponse(res, method);
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
