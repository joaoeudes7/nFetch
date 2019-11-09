import { Response, Headers } from 'node-fetch';

export default class NResponse {
  status!: number;
  headers!: Headers;
  ok!: boolean;
  statusText!: string;
  url!: string;
  redirected!: boolean;
  type!: ResponseType;
  data!: any;

  constructor(res: Response, data = res.body.read().toString()) {
    const { status, headers, ok, statusText, url, redirected, type } = res;

    this.status = status;
    this.headers = headers;
    this.ok = ok;
    this.statusText = statusText;
    this.url = url;
    this.redirected = redirected;
    this.type = type;

    try {
      this.data = JSON.parse(data);
    } catch (error) {
      this.data = data;
    }
  }
}
