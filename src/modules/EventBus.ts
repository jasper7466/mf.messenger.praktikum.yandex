type Callback = (...args: any[]) => void;
type ListenersList = Record<string, Callback[]>;

interface IEventBus {
    subscribe(event: string, callback: Callback): void;
    unsubscribe(event: string, callback: Callback): void;
    debugOn(): void;
    debugOff(): void;
}

export class EventBus implements IEventBus {
    protected _listeners: ListenersList = {};
    protected _debugMode: boolean = false;

    constructor() {
        this._listeners = {};
        this.logger('New EventBus instance created');
    }

    subscribe(event: string, callback: Callback) {
        if (!this._listeners[event])
            this._listeners[event] = [];
        this._listeners[event].push(callback);
        this.logger(`Event subscription (${event})`);
    }

    unsubscribe(event: string, callback: () => void) {
        this.checkEventExistance(event);
        this._listeners[event] = this._listeners[event].filter(listener => listener !== callback);
        this.logger(`Event unsubscription (${event})`);
    }

    emit(event: string, ...args: any) {
        this.logger(`Event emitting initiated (${event})`);
        this.checkEventExistance(event)
        this._listeners[event].forEach(listener => listener(...args));
    }

    debugOn() {
        this._debugMode = true;
    }

    debugOff() {
        this._debugMode = false;
    }

    protected logger(msg: string) {
        if (this._debugMode)
            console.log(`${this.constructor.name}: ${msg}`);
    }

    protected checkEventExistance(event: string) {
        if (!this._listeners[event])
            throw new Error(`Event not found: ${event}`);
    }
}