import { assert, expect } from "chai"
import cloneDeep from "./cloneDeep";

describe('cloneDeep: Black Box Testing', () => {

    describe('Копирование примитивов', () => {
        it('Число', () => {
            assert.strictEqual(cloneDeep(123), 123);
        });

        it('Строка', () => {
            assert.strictEqual(cloneDeep('test'), 'test');
        });

        it('Булево значение', () => {
            expect(cloneDeep(true)).to.be.true;
            expect(cloneDeep(false)).to.be.false;
        });

        it('Undefined и null', () => {
            assert.strictEqual(cloneDeep(undefined), undefined);
            assert.strictEqual(cloneDeep(null), null);
        });

        it('Символ', () => {
            const symbol = Symbol();
            assert.strictEqual(cloneDeep(symbol), symbol);
        });
    });

    describe('Глубокая копия объекта', () => {
        const origin = {
            value1: 'test',
            value2: 123,
            value3: ['123', 456],
            value4: {
                value5: 'sub level',
                value6: true,
                value7: ['test'],
                value8: {
                    value9: 'test',
                }
            }
        }

        const copy: any = cloneDeep(origin);

        it('Копия корня', () => {
            assert.notStrictEqual(origin, copy);
        });

        it('Копия ключей, значения - примитивы ', () => {
            assert.strictEqual(origin.value1, copy.value1);
            assert.strictEqual(origin.value2, copy.value2);
        });

        it('Копия ключей, значения - массивы', () => {
            assert.notStrictEqual(origin.value3, copy.value3);
            assert.strictEqual(origin.value3[0], copy.value3[0]);
            assert.strictEqual(origin.value3[1], copy.value3[1]);
        });

        it('Копия ключей, значения - объекты', () => {
            assert.notStrictEqual(origin.value4, copy.value4);
            assert.strictEqual(origin.value4.value5, copy.value4.value5);
            assert.strictEqual(origin.value4.value6, copy.value4.value6);
        });

        it('Копия вложенных объектов и массивов', () => {
            assert.notStrictEqual(origin.value4.value7, copy.value4.value7);
            assert.strictEqual(origin.value4.value7[0], copy.value4.value7[0]);
            assert.notStrictEqual(origin.value4.value8, copy.value4.value8);
            assert.strictEqual(origin.value4.value8.value9, copy.value4.value8.value9);
        });
    });

    describe('Глубокая копия массива', () => {
        const origin: any[] = [
            'test',
            123,
            [
                '123',
                456
            ],
            {
                value1: 'sub level',
                value2: true,
                value3: ['test'],
                value4: {
                    value5: 'test',
                }
            },
        ]

        const copy: any = cloneDeep(origin);

        it('Копия корня', () => {
            assert.notStrictEqual(origin, copy);
        });

        it('Копия элементов, значения - примитивы ', () => {
            assert.strictEqual(origin[0], copy[0]);
            assert.strictEqual(origin[1], copy[1]);
        });

        it('Копия элементов, значения - массивы', () => {
            assert.notStrictEqual(origin[2], copy[2]);
            assert.strictEqual(origin[2][0], copy[2][0]);
            assert.strictEqual(origin[2][1], copy[2][1]);
        });

        it('Копия элементов, значения - объекты', () => {
            assert.notStrictEqual(origin[3], copy[3]);
            assert.strictEqual(origin[3].value1, copy[3].value1);
            assert.strictEqual(origin[3].value2, copy[3].value2);
            assert.notStrictEqual(origin[3].value3, copy[3].value3);
            assert.strictEqual(origin[3].value3[0], copy[3].value3[0]);
        });

        it('Копия вложенных объектов и массивов', () => {
            assert.notStrictEqual(origin[3].value3, copy[3].value3);
            assert.strictEqual(origin[3].value3[0], copy[3].value3[0]);
            assert.notStrictEqual(origin[3].value4, copy[3].value4);
            assert.strictEqual(origin[3].value4.value5, copy[3].value4.value5);
        });
    });

    describe('Копирование экземпляров классов', () => {
        class nonPlainObject  {
            private readonly _value: unknown;
            constructor(_value: unknown) {}
            public print = () => console.log(this._value);
        }

        const nonPlainInstance = new nonPlainObject('any value');
        const nonPlainInObject = { key: nonPlainInstance };
        const nonPlainInArray = [ nonPlainInstance ];

        it('Выброс исключения при копировании экземпляра класса', () => {
            expect(() => cloneDeep(nonPlainInstance)).to.throw('cloneDeep: Complex object detected');
        });

        it('Выброс исключения при копировании экземпляра класса, вложенного в объект', () => {
            expect(() => cloneDeep(nonPlainInObject)).to.throw('cloneDeep: Complex object detected');
        });

        it('Выброс исключения при копировании экземпляра класса, вложенного в массив', () => {
            expect(() => cloneDeep(nonPlainInArray)).to.throw('cloneDeep: Complex object detected');
        });
    });
});
