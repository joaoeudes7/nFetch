export interface IResponse {
  headers: any;
  status: number;
  data: Promise<any>;
}
