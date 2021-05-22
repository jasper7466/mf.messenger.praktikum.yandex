import { expect } from "chai"
import isPlainObject from "./isPlainObject";

describe('isPlainObject: Black Box Testing', () => {
    it('Пустой объект. Ожидается: true', () => {
        const obj = {};
        expect(isPlainObject(obj)).to.be.true;
    });

    it('Не объект (примитив). Ожидается: false', () => {
        expect(isPlainObject(123)).to.be.false;
    });

    it('Не пустой простой объект. Ожидается: true', () => {
        const obj = {
            a: 1,
            b: {c: 2},
            d: 'test'
        }
        expect(isPlainObject(obj)).to.be.true;
    });

    it('Экземпляр класса. Ожидается: false', () => {
        class nonPlainObject  {
            private readonly _value: unknown;
            constructor(_value: unknown) {}
            public print = () => console.log(this._value);
        }

        const nonPlainInstance = new nonPlainObject('any value');

        expect(isPlainObject(nonPlainInstance)).to.be.false;
    });
});
