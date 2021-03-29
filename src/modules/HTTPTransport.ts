type StringObj = {
    [key: string]: any;
};

type Options = {
    data?: StringObj,
    headers?: Object,
    timeout?: number
}

type RequestOptions = {
    headers?: object,
    data?: StringObj,
    method: string,
}

export default class HTTPTransport {

    private static METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    };

    constructor(readonly _baseURL: string) {}

    get = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransport.METHODS.GET}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransport.METHODS.POST}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransport.METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: HTTPTransport.METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<any> => {
        const {headers = {}, method, data} = options;
        url = `${this._baseURL}${url}`;

        if (method === HTTPTransport.METHODS.GET && !!data)
            url += HTTPTransport.queryStringify(data);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = () => resolve(xhr);
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.timeout = timeout;
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (headers)
                Object.entries(headers).forEach(header => xhr.setRequestHeader(header[0], header[1]));

            if (method === HTTPTransport.METHODS.GET || !data)
                xhr.send();
            else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
                console.log(JSON.stringify(data));
            }
        });
    };

    public static queryStringify(data: StringObj) {
        const params = [];
        for (let key in data) {
            params.push(`${key}=${data[key]}`)
        }
        return `?${params.join('&')}`;
    }
}