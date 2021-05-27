import EventBus from "./EventBus";
import { Callback } from "../types";

interface IWebSocketTransport {
    open(): void;
    close(): void;
    send(): void;
    subscribe(event: EVENTS, callback: Callback): void;
    unsubscribe(event: EVENTS, callback: Callback): void;
}

enum EVENTS {
    OPENED = '1',
    CLOSED = '2',
    SENT = '3',
    RECEIVED = '4',
    ERROR = '5',
}

export default class WebSocketTransport implements IWebSocketTransport {

    static EVENTS = EVENTS;

    protected _eventBus: EventBus;
    protected _socket: WebSocket | null;
    protected _baseUrl: string;
    protected _optionalUrl: string | null;

    /**
     * Создаёт экземпляр класса для обмена сообщениями через протокол WebSocket
     */
    constructor(baseUrl: string) {
        this._eventBus = new EventBus();
        this._baseUrl = baseUrl;
        this._optionalUrl = null;
        this._socket = null;
    }

    /**
     * Открывает соединение по url = baseUrl + optionalUrl.
     * Если соединение уже открыто с указанным optionalUrl - повторное открытие не выполняется.
     * @param optionalUrl - опциональная часть url, значение по умолчанию - ''
     */
    public open(optionalUrl = '') {
        if (this._optionalUrl === optionalUrl) {
            return;
        }

        this.close();

        this._socket = new WebSocket(`${this._baseUrl}${optionalUrl}`);
        this._socket.addEventListener('message', this._messageEventHandler.bind(this));
        this._socket.addEventListener('error', this._errorEventHandler.bind(this));
        this._optionalUrl = optionalUrl;
        this._eventBus.emit(EVENTS.OPENED, optionalUrl);
    }

    /**
     * Закрывает соединение, если оно открыто.
     */
    public close() {
        if (this._socket === null) {
            return;
        }

        this._socket.removeEventListener('message', this._messageEventHandler.bind(this));
        this._socket.removeEventListener('error', this._errorEventHandler.bind(this));

        this._socket.close();
        this._socket = null;
        this._optionalUrl = null;
        this._eventBus.emit(EVENTS.CLOSED);
    }

    /**
     * Отправляет сообщение.
     * Если соединение закрыто или ещё не открыто - выбрасывается исключение
     * @param message - отправляемое сообщение, значение по умолчанию - 'ping'
     */
    public send(message = 'ping') {
        if (this._socket === null) {
            throw new Error(`${this.constructor.name}: Socket is closed or not opened yet.`)
        }

        this._socket.send(message);
        this._eventBus.emit(EVENTS.SENT, message);
    }

    /**
     * Подписывает пользовательский обработчик на указанное событие внутренней шины событий
     * @param event - событие
     * @param callback - обработчик
     */
    public subscribe(event: EVENTS, callback: Callback) {
        this._eventBus.subscribe(event, callback);
    }

    /**
     * Отписывает пользовательский обработчик от указанного события внутренней шины событий
     * @param event - событие
     * @param callback - обработчик
     */
    public unsubscribe(event: EVENTS, callback: Callback) {
        this._eventBus.unsubscribe(event, callback);
    }

    /**
     * Базовый обработчик события 'message'.
     * Инициирует событие RECEIVED на внутренней шине событий.
     * Добавляется/удаляется при каждом открытии/закрытии сокета
     * @param event - объект MessageEvent
     * @protected
     */
    protected _messageEventHandler(event: MessageEvent) {
        this._eventBus.emit(EVENTS.RECEIVED, event);
    }

    /**
     * Базовый обработчик события 'error'.
     * Инициирует событие ERROR на внутренней шине событий.
     * Добавляется/удаляется при каждом открытии/закрытии сокета
     * @param event - объект ErrorEvent
     * @protected
     */
    protected _errorEventHandler(event: ErrorEvent) {
        this._eventBus.emit(EVENTS.ERROR, event);
    }
}
