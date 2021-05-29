import { assert } from "chai"
import merge from "./merge";

describe('merge: Black Box Testing', () => {
    const acceptor: any = {
        a: 1,
        b: [{test1: 1}, 1]
    }

    const emitter: any = {
        a: 3,
        b: [{test2: 2}, 2, 3],
        c: 5
    }

    const merged = merge(acceptor, emitter) as any;

    it('Возвращается lhs-объект', () => {
        assert.strictEqual(merged, acceptor);
    });

    it('Слияние ключей, значения - примитивы', () => {
        assert.strictEqual(merged.a, emitter.a);
    });

    it('Добавление несуществующих ключей', () => {
        assert.strictEqual(merged.c, emitter.c);
    });

    it('Слияние вложенных массивов', () => {
        assert.strictEqual(merged.b, acceptor.b);
        assert.strictEqual(merged.b[0], acceptor.b[0]);
        assert.strictEqual(merged.b[1], emitter.b[1]);
        assert.strictEqual(merged.b[2], emitter.b[2]);
    });

    it('Слияние вложенных объектов', () => {
        assert.strictEqual(merged.b[0].test1, acceptor.b[0].test1);
        assert.strictEqual(merged.b[0].test2, emitter.b[0].test2);
    });
});
