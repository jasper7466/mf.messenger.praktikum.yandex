import {assert} from "chai";
import Component from "@modules/Component";
import EventBus from "@modules/EventBus";

describe('Component.ts: Инициализация', () => {
    it('Инициализация по умолчанию (без входных аргументов)', () => {
        const component = new Component();
        // @ts-ignore
        assert.equal(component._meta.tagName, 'div', 'Тег по молчанию: div');
        // @ts-ignore
        assert.equal(typeof component._meta.props, 'object', 'Свойства по умолчанию');
        // @ts-ignore
        assert.equal(component._meta.storePath, null, 'Селектор хранилища по умолчанию: null');
        assert.equal(component.eventBus instanceof EventBus, true, 'Шина событий');
    });

    it('Инициализация с входными аргументами', () => {
        const component = new Component({p: 'property'}, 'path', 'button');
        // @ts-ignore
        assert.equal(component._meta.tagName, 'button', 'Инициализация тега');
        // @ts-ignore
        assert.equal(component._meta.props.p, 'property', 'Инициализация свойств');
        // @ts-ignore
        assert.equal(component._meta.storePath, 'path', 'Инициализация селектора хранилища');
        assert.equal(component.eventBus instanceof EventBus, true, 'Шина событий');
    });
});

describe('Component.ts: События жизненного цикла', () => {
    it('Обновление свойств', () => {
        const component = new Component({prop: 'value'});
        const events: string[] = [];

        component.eventBus.subscribe(Component.EVENTS.FLOW_CDU, (() => events.push('CDU')).bind(this));
        component.eventBus.subscribe(Component.EVENTS.FLOW_CDC, (() => events.push('CDC')).bind(this));
        component.setProps({prop: 'newValue'});

        assert.equal(events[0], 'CDC');
        assert.equal(events[1], 'CDU');
    });

    it('Монтирование в DOM', () => {
        const component = new Component({prop: 'value'});
        const events: string[] = [];
        const parent = document.querySelector('.application');

        component.eventBus.subscribe(Component.EVENTS.STATUS_CDM, (() => events.push('CDM')).bind(this));
        component.eventBus.subscribe(Component.EVENTS.STATUS_CDU, (() => events.push('CDU')).bind(this));

        if (parent) {
            component.mount(parent as HTMLElement);
        }

        assert.equal(events.length, 1, 'Счётчик событий: 1');
        assert.equal(events.pop(), 'CDM', 'Тип события: CDM');

        component.unmount();

        assert.equal(events.length, 1, 'Счётчик событий: 1');
        assert.equal(events.pop(), 'CDU', 'Тип события: CDU');
    });
});

describe('Component.ts: Работа с элементом', () => {
    const component = new Component();

    it('Получение элемента', () => {
        const element = component.element;
        assert.equal(element instanceof HTMLElement, true, 'Возвращён DOM-объект');
    });

    it('Скрытие элемента', () => {
        component.show();
        component.hide();
        assert.equal(component.element.style.display, 'none');
    });

    it('Отображение элемента', () => {
        component.hide();
        component.show();
        assert.equal(component.element.style.display, 'block');
    });
});