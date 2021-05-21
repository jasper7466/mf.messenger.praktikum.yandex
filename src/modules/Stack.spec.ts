import { assert, expect } from "chai"
import Stack from "./Stack";

describe('Stack.ts: Black Box Testing', () => {

    function emptyStackBehavior(stack: Stack) {
        it('Размер стека. Ожидается: 0', () => {
            assert.strictEqual(stack.getSize(), 0);
        });

        it('Проверка пустоты стека. Ожидается: стек пуст', () => {
            assert.strictEqual(stack.isEmpty(), true);
        });

        it('Выброс исключения при попытке чтения из пустого стека', () => {
            expect(() => stack.peek()).to.throw('Stack is empty');
        });

        it('Выброс исключения при попытке удаления из пустого стека', () => {
            expect(() => stack.pop()).to.throw('Stack is empty');
        });
    }

    function notEmptyStackBehavior(stack: Stack, size: number, top: unknown) {

        it(`Чтение вершины стека. Ожидается: ${top}`, () => {
            assert.strictEqual(stack.peek(), top);
        });

        it(`Размер стека. Ожидается: ${size}`, () => {
            assert.strictEqual(stack.getSize(), size);
        });

        it('Проверка пустоты стека. Ожидается: стек не пуст', () => {
            assert.strictEqual(stack.isEmpty(), false);
        });

        it(`Удаление вершины стека. Ожидается: ${top}`, () => {
            assert.strictEqual(stack.pop(), top);
        });
    }

    describe('Инициализация пустого стека', () => {
        const stack = new Stack();
        emptyStackBehavior(stack);
    });

    describe('Работа со стеком', () => {

        describe('В стеке 1 элемент', () => {
            const stack = new Stack();
            const element = 'one';

            it(`Добавление одного элемента: ${element}`, () => {
                assert.strictEqual(stack.push('one'), 1);
            });
            notEmptyStackBehavior(stack, 1, element);
            emptyStackBehavior(stack);
        });

        describe('В стеке несколько элементов разного типа', () => {
            const stack = new Stack();
            const element1 = 'one';
            const element2 = 2;
            const element3 = ['three'];
            const element4 = {value: 'four'};

            it('Добавление элементов разного типа', () => {
                assert.strictEqual(stack.push(element1), 1);
                assert.strictEqual(stack.push(element2), 2);
                assert.strictEqual(stack.push(element3), 3);
                assert.strictEqual(stack.push(element4), 4);
            });

            notEmptyStackBehavior(stack, 4, element4);
            notEmptyStackBehavior(stack, 3, element3);
            notEmptyStackBehavior(stack, 2, element2);
            notEmptyStackBehavior(stack, 1, element1);
            emptyStackBehavior(stack);
        });

        describe('Очистка стека', () => {
            const stack = new Stack();

            it('Добавление элементов', () => {
                assert.strictEqual(stack.push('one'), 1);
                assert.strictEqual(stack.push('two'), 2);
                assert.strictEqual(stack.push('three'), 3);
                assert.strictEqual(stack.push('four'), 4);
            });

            notEmptyStackBehavior(stack, 4, 'four');

            it('Очистка стека', () => {
                stack.clear();
            });

            emptyStackBehavior(stack);
        });
    });
});
