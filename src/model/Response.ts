export class Response {
  headers: any;
  status: STATUS;
  data: any;

  constructor(headers: any, status: number, data: any) {
    this.headers = headers;
    this.status = status;
    this.data = data;

    if (status == STATUS.TIMEOUT) {
      new Error('Request timed out');
    }
  }

  toObject<T>(obj: T) {
    return async() => Object.assign(<T>{}, await this.data)
  }
}

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum STATUS {
  SUCESS = 200,
  ERROR = 500,
  TIMEOUT = 408
}
