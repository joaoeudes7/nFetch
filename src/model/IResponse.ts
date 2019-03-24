export interface IResponse {
    headers: Headers;
    status: number;
    data: Promise<any>;
}
