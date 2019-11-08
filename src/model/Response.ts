import { RequestMethod } from "./Config";

export class NResponse extends Response {
  data: any;
  method: RequestMethod;

  constructor(res: Response, method: RequestMethod) {
    super();

    // @ TODO resolve this
    Object.assign(this, res);

    this.method = method;
    this.resolveData();
  }

  private async resolveData() {
    this.data = await this.json();
  }

  /**
   * Funcional only in Typescript
   */
  public toObject<T>() {
    return Object.assign({} as T, this.data);
  }
}

export class NTimeout extends NResponse {
  constructor(resInit: RequestInit, method: RequestMethod) {
    const status = 408;
    const statusText = "Timeout";

    const _resInit = Object.assign(resInit, { status, statusText });
    const res = new Response(null, _resInit);

    super(res, method);

    throw this;
  }
}
