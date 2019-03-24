import { IConfig } from './model/IConfigs';
import { IResponse } from './model/IResponse';

export class nfetch {

    private configs: IConfig = {
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        }
    };

    constructor(configs?: IConfig) {
        this.configs = Object.assign(this.configs, configs);
    };

    private generateRequest(_type: string, _url: string, _data?: object, _headers?: Headers): Promise<IResponse> {
        let didTimeOut = false;
        const requestInit = {
            method: _type,
            body: JSON.stringify(_data),
            headers: Object.assign(this.configs.headers, _headers)
        }

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(async () => {
                didTimeOut = true;
                reject(new Error('Request timed out'));
            });


            window.fetch(_url, requestInit)
                .then(res => {
                    clearTimeout(timeout);
                    if (!didTimeOut) {
                        const { json, headers, status, url } = res;
                        resolve({ headers, status, url, data: json() });
                    }
                })
                .catch(error => reject(error));
        });
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
