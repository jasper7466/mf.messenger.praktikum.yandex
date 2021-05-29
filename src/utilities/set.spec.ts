import { assert, expect } from "chai"
import set from "./set";
import {PlainObject} from "../types";

describe('set: Black Box Testing', () => {

    describe('Валидация аргументов, отработка исключений', () => {
        it('Попытка записи в примитив или экземпляр класса', () => {
            // @ts-ignore
            expect(() => set(123, 'sample.path', {})).to.throw(
                'set: Type of "destination" must be object or array'
            );
            // @ts-ignore
            expect(() => set(new Date(), 'sample.path', {})).to.throw(
                'set: Type of "destination" must be object or array'
            );
        });

        it('Попытка записи не массива/объекта в корень массива/объекта', () => {
            // @ts-ignore
            expect(() => set([], '', {})).to.throw(
                'set: In case of empty path, if type one of "data/destination" is array, other must be same type'
            );
            expect(() => set({}, '', [])).to.throw(
                'set: In case of empty path, if type one of "data/destination" is array, other must be same type'
            );
        });

        it('Попытка записи примитива в корень объекта', () => {
            // @ts-ignore
            expect(() => set({}, '', 123)).to.throw(
                'set: Type of "data" must be object in case of empty path'
            );
        });

        it('Попытка записи произвольного ключа в массив', () => {
            // @ts-ignore
            expect(() => set([], 'a.b.c', 123)).to.throw(
                'set: Attempt to set custom key of array'
            );
        });

        it('Невалидный путь', () => {
            expect(() => set({}, '.', 123)).to.throw('set: Invalid path "."');
            expect(() => set({}, 'a. .b', 123)).to.throw('set: Invalid path "a. .b"');
            expect(() => set({}, '   ', 123)).to.throw('set: Invalid path "   "');
        });
    });

    describe('Возвращаемое значение', () => {
        it('Идентично целевому объекту', () => {
            const sampleObj = {};
            const sampleArr: any = [];
            assert.strictEqual(set(sampleObj, 'sample.path', 123), sampleObj);
            assert.strictEqual(set(sampleArr, '', [1, 2, 3]), sampleArr);
        });
    });

    describe('Установка значений', () => {
        it('В корень объекта по несуществующему ключу', () => {
            const destination: PlainObject = {};
            const data = {d: 123};

            set(destination, '', data);

            assert.strictEqual(destination.d, data.d);
        });

        it('В корень объекта по существующему ключу', () => {
            const destination: PlainObject = {d: 123};
            const data = {d: 456};

            set(destination, '', data);

            assert.strictEqual(destination.d, data.d);
        });

        it('В тело объекта по несуществующему ключу', () => {
            const obj = {};
            const arr: unknown[] = [];
            const num = 123;
            const destination: PlainObject = {
                obj: obj,
                arr: arr,
                num: num,
                key: {
                    nextKey: 123,
                }
            };
            const data = {
                anotherKey: 456
            };

            set(destination, 'key', data);

            assert.strictEqual(destination.obj, obj);
            assert.strictEqual(destination.arr, arr);
            assert.strictEqual(destination.num, num);
            // @ts-ignore
            assert.strictEqual(destination.key.nextKey, 123);
            // @ts-ignore
            assert.strictEqual(destination.key.anotherKey, 456);
        });

        it('В тело объекта по существующему ключу', () => {
            const obj = {};
            const arr: unknown[] = [];
            const num = 123;
            const destination: PlainObject = {
                obj: obj,
                arr: arr,
                num: num,
                key: {
                    nextKey: 123,
                }
            };
            const data = {
                anotherKey: 456
            };

            set(destination, 'key.nextKey', data);

            assert.strictEqual(destination.obj, obj);
            assert.strictEqual(destination.arr, arr);
            assert.strictEqual(destination.num, num);
            // @ts-ignore
            assert.strictEqual(destination.key.nextKey, data);
        });

        it('Из массива в массив', () => {
            const destination: unknown[] = [1, 2, 3];
            const data = [4, 5, 6];

            set(destination, '', data);

            assert.strictEqual(destination[0], data[0]);
            assert.strictEqual(destination[1], data[1]);
            assert.strictEqual(destination[2], data[2]);
            assert.strictEqual(destination.length, data.length);
        });
    });
});
