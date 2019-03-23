export interface IResponse {
    headers: Headers;
    status: number;
    url: string;
    data: Promise<any>;
}
