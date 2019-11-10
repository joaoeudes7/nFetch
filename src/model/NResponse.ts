export default class NResponse {
  status!: number;
  headers!: Headers;
  ok!: boolean;
  statusText!: string;
  url!: string;
  redirected!: boolean;
  type!: ResponseType;
  data!: any;
  text!: string;
  body: ReadableStream<Uint8Array> | null;
  arrayBuffer: () => Promise<ArrayBuffer>;
  blob: () => Promise<Blob>;

  constructor(res: Response, jsonResolved: any = {}, textResolved: string = "") {
    const { status, headers, ok, statusText, url, redirected, type, body, arrayBuffer, blob } = res;

    this.status = status;
    this.headers = headers;
    this.ok = ok;
    this.statusText = statusText;
    this.url = url;
    this.redirected = redirected;
    this.type = type;
    this.body = body;
    this.arrayBuffer = arrayBuffer;
    this.blob = blob;
    this.data = jsonResolved;
    this.text = textResolved;
  }
}
