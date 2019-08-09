export class Response {
  public headers: any;
  public status: STATUS;
  public data: any;

  constructor(headers: any, status: number, data: any) {
    this.headers = headers;
    this.status = status;
    this.data = data;
  }

  public toObject<T>() {
    return async () => Object.assign({} as T, await this.data);
  }
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum STATUS {
  SUCESS = 200,
  ERROR = 500,
  TIMEOUT = 408,
}
