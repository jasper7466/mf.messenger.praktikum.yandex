import { expect } from "chai"
import isObject from "./isObject";

describe('isObject: Black Box Testing', () => {
    it('Простой объект. Ожидается: true', () => {
        expect(isObject({})).to.be.true;
    });

    it('Массив. Ожидается: true', () => {
        expect(isObject([])).to.be.true;
    });

    it('Экземпляр класса. Ожидается: true', () => {
        class nonPlainObject  {
            private readonly _value: unknown;
            constructor(_value: unknown) {}
            public print = () => console.log(this._value);
        }

        const nonPlainInstance = new nonPlainObject('any value');

        expect(isObject(nonPlainInstance)).to.be.true;
    });

    it('Функция. Ожидается: false', () => {
        expect(isObject(() => {})).to.be.false;
    });

    it('Null. Ожидается: false', () => {
        expect(isObject(null)).to.be.false;
    });

    it('Undefined. Ожидается: false', () => {
        expect(isObject(undefined)).to.be.false;
    });
});
