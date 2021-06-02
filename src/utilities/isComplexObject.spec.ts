import { expect } from "chai"
import isComplexObject from "./isComplexObject";

describe('isComplexObject: Black Box Testing', () => {
    it('Пустой объект. Ожидается: false', () => {
        const obj = {};
        expect(isComplexObject(obj)).to.be.false;
    });

    it('Не объект (число). Ожидается: false', () => {
        expect(isComplexObject(123)).to.be.false;
    });

    it('Не объект (функция). Ожидается: false', () => {
        expect(isComplexObject(() => {})).to.be.false;
    });

    it('Не пустой простой объект. Ожидается: false', () => {
        const obj = {
            a: 1,
            b: {c: 2},
            d: 'test'
        }
        expect(isComplexObject(obj)).to.be.false;
    });

    it('Экземпляр класса. Ожидается: true', () => {
        class nonPlainObject  {
            private readonly _value: unknown;
            constructor(_value: unknown) {}
            public print = () => console.log(this._value);
        }

        const nonPlainInstance = new nonPlainObject('any value');

        expect(isComplexObject(nonPlainInstance)).to.be.true;
    });
});
