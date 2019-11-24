export default class NResponse {
  status!: number;
  headers!: Headers;
  ok!: boolean;
  statusText!: string;
  url!: string;
  redirected!: boolean;
  type!: ResponseType;
  data!: any;
  body: ReadableStream<Uint8Array> | null;
  arrayBuffer: () => Promise<ArrayBuffer>;
  blob: () => Promise<Blob>;
  text: () => Promise<string>;

  constructor(res: Response, jsonResolved: any = {}) {
    this.status = res.status;
    this.headers = res.headers;
    this.ok = res.ok;
    this.statusText = res.statusText;
    this.url = res.url;
    this.redirected = res.redirected;
    this.type = res.type;
    this.body = res.body;
    this.arrayBuffer = res.arrayBuffer;
    this.blob = res.blob;
    this.text = res.text;
    this.data = jsonResolved;
  }
}
