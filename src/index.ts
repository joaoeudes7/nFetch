import { IConfig } from './model/IConfigs';
import { IResponse } from './model/IResponse';

export class nfetch {

    private configs: IConfig = {
        timeout: 5000,
    	redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
    };

    constructor(configs?: IConfig) {
        this.configs = Object.assign(this.configs, configs);
    };

    private async generateRequest(method: string, url: string, _data?: object, configs = this.configs) {
        const requestInit = {
            method,
            body: JSON.stringify(_data),
            headers: configs.headers
        };

        const timeout = setTimeout(() => {
            new Error('Request timed out');
            return { headers: requestInit.headers, status: 408, data: null  }
        });

        // Get response
        const res = await window.fetch(url, requestInit);

        // Cancell timeout
        clearTimeout(timeout);

        const { json, headers, status } = res;
        return { headers, status, data: await json() };
    };

    get(url: string, data?: object, configs?: IConfig) {
        return this.generateRequest("GET", url, data, configs);
    };

    post(url: string, data?: object, configs?: IConfig) {
        return this.generateRequest("POST", url, data, configs);
    };

    delete(url: string, data?: object, configs?: IConfig) {
        return this.generateRequest("DELETE", url, data, configs);
    };

    put(url: string, data?: object, configs?: IConfig) {
        return this.generateRequest("PUT", url, data, configs);
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

new nfetch().get('').then(r => r)
