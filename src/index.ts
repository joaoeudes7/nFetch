import { IConfig } from './model/IConfigs';
import { IResponse } from './model/IResponse';

export class nfetch {

    private configs: IConfig = {
        headers: {'Content-Type': 'application/json'}
    };

    constructor(configs?: IConfig) {
        this.configs = Object.assign(this.configs, configs);
    };

    private async generateRequest(_type: string, _url: string, _data?: object, _headers?: Headers): Promise<IResponse> {
        const requestInit = {
            method: _type,
            body: JSON.stringify(_data),
            headers: Object.assign(this.configs.headers, _headers)
        }

        const res = await window.fetch(_url, requestInit);
        const { json, headers, status, url } = res;

        return { headers, status, url, data: json() };
    };

    get(url: string, data?: object, headers?: Headers) {
        return this.generateRequest("GET", url, data, headers);
    };

    post(url: string, data?: object, headers?: Headers) {
        return this.generateRequest("POST", url, data, headers);
    };

    delete(url: string, data?: object, headers?: Headers) {
        return this.generateRequest("DELETE", url, data, headers);
    };

    put(url: string, data?: object, headers?: Headers) {
        return this.generateRequest("PUT", url, data, headers);
    };

    async all(requests: Promise<IResponse>[]) {
        const data: IResponse[] = [];
        for (let index = 0; index < requests.length; index++) {
            data.push(await requests[index]);
        }

        return data;
    }
}


export default new nfetch();
