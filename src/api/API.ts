import {HTTPTransport, Options} from "@modules/HTTPTransport";
import {SETTINGS} from "@/config";

const transport = new HTTPTransport(SETTINGS.baseURL);

// Базовый класс для реализации API
export class API {
    constructor() {
    }

    // Прозрачный обработчик исключений, может быть переопределён
    protected transportErrorHandler = (e: Error) => {
        throw new Error(`${this.constructor.name}: Transport error (${e})`);
    }

    // Обёртки над методами с возможностью обработки исключений на уровне API

    protected get = (url: string, options?: Options) => {
        try {
            return transport.get(url, options);
        }
        catch (e) {
            this.transportErrorHandler(e);
        }
    }

    protected post = (url: string, options?: Options) => {
        try {
            return transport.post(url, options);
        }
        catch (e) {
            this.transportErrorHandler(e);
        }
    }

    protected put = (url: string, options?: Options) => {
        try {
            return transport.put(url, options);
        }
        catch (e) {
            this.transportErrorHandler(e);
        }
    }

    protected delete = (url: string, options?: Options) => {
        try {
            return transport.delete(url, options);
        }
        catch (e) {
            this.transportErrorHandler(e);
        }
    }
}