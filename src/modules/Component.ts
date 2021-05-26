import EventBus from './EventBus';
import Store from './Store';
import {PlainObject} from "../types";

type Property = Record<string, any>;

interface Meta {
    tagName: string;
    props: Property;
    storePath: string | null;
}

const store = new Store();

export default class Component {
    static EVENTS = {
        CONSTRUCTED: 'construction-done',               // Завершена работа конструктора
        INITIALISED: 'flow:component-did-init',         // Завершена инициализация
        UPDATED: 'flow:component-did-update',           // Обновлены параметры компонента
        COMPILED: 'flow:component-did-compile',         // Выполнена сборка компонента
        MOUNTED: 'status:component-did-mount',          // Компонент смонтирован
        UNMOUNTED: 'status:component-did-unmount'       // Компонент демонтирован
    };

    private readonly _meta: Meta;       // Мета-данные
    private readonly _props: {};        // Свойства
    private _element: HTMLElement;      // Корневой HTML-элемент
    protected _parentNode: HTMLElement | null = null;   // Родительский узел в DOM-дереве
    public eventBus: EventBus;          // Внутренняя шина событий жизненного цикла

    /**
     * Создаёт экземпляр класса компонента
     * @param props
     * @param storePath
     * @param tagName
     */
    constructor(props = {}, storePath: string | null = null, tagName = 'div') {
        this.eventBus = new EventBus();
        this._meta = { tagName, props, storePath };
        this._props = this._makePropsProxy(props);

        this._registerEvents();
        this.eventBus.emit(Component.EVENTS.CONSTRUCTED);
    }

    /**
     * Регистрирует цепочки методов жизненного цикла компонента на внутренней шине событий
     * @protected
     */
    protected _registerEvents() {
        // Создание и инициализация, первичная компиляция
        this.eventBus.subscribe(Component.EVENTS.CONSTRUCTED, this._init.bind(this));
        this.eventBus.subscribe(Component.EVENTS.INITIALISED, this._compile.bind(this, true));

        // Компиляция при изменениях свойств
        this.eventBus.subscribe(Component.EVENTS.UPDATED, this._compile.bind(this));
    }

    /**
     * Инициализирует компонент
     * @protected
     */
    protected _init() {
        this._element = document.createElement(this._meta.tagName);

        if (this._meta.props.hasOwnProperty('classList'))
            this._meta.props.classList.forEach((className: string) => this._element.classList.add(className));

        // Установка наследования всех стилей родителя, чтобы не ломалась вёрстка
        this._element.setAttribute('style', 'all: inherit');

        if (this._meta.storePath)
            store.subscribe(this._meta.storePath, () => this.eventBus.emit(Component.EVENTS.UPDATED));

        this.eventBus.emit(Component.EVENTS.INITIALISED);
    }

    /**
     * Компилирует вёрстку элемента. В приоритете получение свойств из хранилища (если указан путь)
     * @force - флаг, указывающий на необходимость компиляции, даже если компонент не смонтирован (по умолчанию false)
     * @protected
     */
    protected _compile(force = false) {
        // Игнорируем компиляцию, если компонент никуда не смонтирован и не требуется принудительная компиляция
        if (!this._parentNode && !force)
            return;

        this.beforeCompile();

        if (this._meta.storePath) {
            this._meta.props = (store.get(this._meta.storePath) as Property) || this._meta.props;
        }

        const block = this.compile(this._meta.props);

        if (this._element) {
            this._element.innerHTML = block;
        }

        this.afterCompile();

        this.eventBus.emit(Component.EVENTS.COMPILED);
    }

    /**
     * Переопределяемый метод, который получает на вход контекст и должен на выходе вернуть вёрстку компонента
     * @param context - контекст компиляции
     */
    protected compile(context: PlainObject): string | never {
        console.log(context);
        throw new Error(`${this.constructor.name}: Method "compile" must be redefined`);
    }

    /**
     * Помещает корневой элемент компонента в качестве дочернего для указанного DOM-узла
     * @param parentNode - родительский узел
     * @protected
     */
    protected mount(parentNode: HTMLElement): void {
        this.beforeMount();

        if (this._parentNode)
            throw new Error(`${this.constructor.name}: Component is already mounted`);
        parentNode.appendChild(this._element);
        this._parentNode = parentNode;

        this.afterMount();

        this.eventBus.emit(Component.EVENTS.MOUNTED);
    }

    /**
     * Открепляет корневой элемент компонента от родительского DOM-узла
     * @protected
     */
    unmount(): void {
        if (!this._parentNode)
            return;

        this.beforeUnmount();

        this._parentNode.removeChild(this._element);
        this._parentNode = null;

        this.afterUnmount();

        this.eventBus.emit(Component.EVENTS.UNMOUNTED);
    }

    /**
     * Подписывает переданный родительский компонент на событие обновления свойств настоящего компонента.
     * @param parent - родительский компонент
     */
    bindParent(parent: Component) {
        if (this._meta.storePath)
            store.subscribe(this._meta.storePath, () => parent.eventBus.emit(Component.EVENTS.UPDATED));
    }

    /**
     * Добавляет свойства компоненту
     * @param nextProps - объект со свойствами
     */
    public setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this._props, nextProps);
    };

    /**
     * Возвращает корневой HTML-элемент компонента
     */
    public get element() {
        return this._element;
    }

    /**
     * Отображает скрытый компонент путём установки CSS-свойства "display" в значение "block".
     * DOM-дерево не модифицируется
     */
    public show() {
        const element = this.element;
        if (element)
            element.style.display = "block";
    }

    /**
     * Скрывает компонент путём установки CSS-свойства "display" в значение "none".
     * Вёрстка остаётся в DOM-дереве
     */
    public hide() {
        const element = this.element;
        if (element)
            element.style.display = "none";
    }

    /**
     * Необязательный переопределяемый метод для выполнения дополнительных действий перед компиляцией
     */
    protected beforeCompile() {}

    /**
     * Необязательный переопределяемый метод для выполнения дополнительных действий после компиляции
     */
    protected afterCompile() {}

    /**
     * Необязательный переопределяемый метод для выполнения дополнительных действий перед монтированием
     */
    protected beforeMount() {}

    /**
     * Необязательный переопределяемый метод для выполнения дополнительных действий после монтирования
     */
    protected afterMount() {}

    /**
     * Необязательный переопределяемый метод для выполнения дополнительных действий перед размонтированием
     */
    protected beforeUnmount() {}

    /**
     * Необязательный переопределяемый метод для выполнения дополнительных действий после размонтирования
     */
    protected afterUnmount() {}

    /**
     * Делает прокси-обёртку для параметров компонента.
     * После перезаписи параметра прокси инициирует соответствующее событие.
     * При попытке удаления свойства - прокси выбросит исключение
     * @param props - объект с параметрами
     * @protected
     */
    protected _makePropsProxy(props: object) {
        const self = this;
        return new Proxy(props, {
            set(target: any, prop: any, val) {
                target[prop] = val;
                self.eventBus.emit(Component.EVENTS.UPDATED);
                return true;
            },
            deleteProperty() {
                throw new Error(`${this.constructor.name}: Proxy. Component property deletion is prohibited`);
            }
        });
    }
}
