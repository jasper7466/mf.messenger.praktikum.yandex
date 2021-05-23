import EventBus from './EventBus';
import Store from './Store';
import merge from "../utilities/merge";

type Property = Record<string, any>;

interface Meta {
    tagName: string;
    props: Property;
    storePath: string | null;
}

const store = new Store();

export default class Component {
    static EVENTS = {
        CONSTRUCT: 'construct',                     // Завершена работа конструктора
        FLOW_CDI: 'flow:component-did-init',        // Завершена инициализация
        FLOW_CDU: 'flow:component-did-update',      // Обновлены параметры компонента
        FLOW_CDC: 'flow:component-did-compile',     // Выполнена сборка компонента
        STATUS_CDM: 'status:component-did-mount',   // Компонент смонтирован
        STATUS_CDU: 'status:component-did-unmount'  // Компонент демонтирован
    };

    private readonly _meta: Meta;
    private readonly _props: object;
    private _element: HTMLElement;
    protected _parentNode: HTMLElement | null = null;
    public eventBus: EventBus;


    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     * @param {storePath} storePath
     *
     * @returns {void}
     */
    constructor(props = {}, storePath: string | null = null, tagName = 'div') {
        this._meta = { tagName, props, storePath };
        this._props = this._makePropsProxy(props);
        this.eventBus = new EventBus();
        this._registerEvents();
        this.eventBus.emit(Component.EVENTS.CONSTRUCT);
    }

    _registerEvents() {
        this.eventBus.subscribe(Component.EVENTS.CONSTRUCT, this._init.bind(this));
        this.eventBus.subscribe(Component.EVENTS.FLOW_CDI, this._componentDidUpdate.bind(this));
        this.eventBus.subscribe(Component.EVENTS.FLOW_CDU, this._compile.bind(this));
        this.eventBus.subscribe(Component.EVENTS.STATUS_CDM, this.componentDidMount.bind(this));
        this.eventBus.subscribe(Component.EVENTS.STATUS_CDU, this.componentDidUnmount.bind(this));
    }

    _init() {
        this._element = this._createDocumentElement(this._meta.tagName);
        if (this._meta.props.hasOwnProperty('classList'))
            this._meta.props.classList.forEach((c: string) => this._element.classList.add(c));
        // TODO: Установка наследования всех стилей родителя, чтобы не ломалась вёрстка
        this._element.setAttribute('style', 'all: inherit');
        if (this._meta.storePath)
            store.eventBus.subscribe(this._meta.storePath, () => this.eventBus.emit(Component.EVENTS.FLOW_CDU));
        this.eventBus.emit(Component.EVENTS.FLOW_CDI);
    }

    _componentDidUpdate() {
        this.componentDidUpdate();
        this.eventBus.emit(Component.EVENTS.FLOW_CDU);
    }

    componentDidUpdate() {}

    _compile() {
        if (this._meta.storePath) {
            merge(this._meta.props, store.get(this._meta.storePath));
        }
        const block = this.compile(this._meta.props);
        if (this._element) {
            this._element.innerHTML = block;
        }
        this.compiled();
        this.eventBus.emit(Component.EVENTS.FLOW_CDC);
    }

    compile(context: any) {
        return context;
    }

    compiled() {}

    mount(parentNode: HTMLElement): void {
        if (this._parentNode)
            throw new Error(`${this.constructor.name}: Component is already mounted`);
        parentNode.appendChild(this._element);
        this.componentDidMount();
        this._parentNode = parentNode;
        this.eventBus.emit(Component.EVENTS.STATUS_CDM);
    }

    componentDidMount() {}

    unmount(): void {
        if (!this._parentNode)
            return;
        this._parentNode.removeChild(this._element);
        this._parentNode = null;
        this.componentDidUnmount();
        this.eventBus.emit(Component.EVENTS.STATUS_CDU);
    }

    componentDidUnmount() {}

    bindParent(parent: Component) {
        if (this._meta.storePath)
            store.eventBus.subscribe(this._meta.storePath, () => parent.eventBus.emit(Component.EVENTS.FLOW_CDU));
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this._props, nextProps);
    };

    public get element() {
        return this._element;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: object) {
        const self = this;
        return new Proxy(props, {
            set(target: any, prop: any, val) {
                target[prop] = val;
                self.eventBus.emit(Component.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty() {
                throw new Error("нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        const element = this.element;
        if (element)
            element.style.display = "block";
    }

    hide() {
        const element = this.element;
        if (element)
            element.style.display = "none";
    }
}
