interface IStack {
    push(value: unknown): number;
    pop(): unknown;
    peek(): unknown;
    isEmpty(): boolean;
    getSize(): number;
    clear(): void;
}

type Node = {
    value: unknown,
    prev: Node,
} | null;

/**
 * Реализует структуру данных "Стек"
 */
export default class Stack implements IStack {

    protected _size: number;    // Текущее количество элементов в стеке
    protected _top: Node;       // Ссылка на верхушку стека

    constructor() {
        this._size = 0;
        this._top = null;
    }

    /**
     * Помещает элемент в стек
     * @param value - Помещаемый элемент
     * @returns Возвращает новый размер стека
     */
    push(value: unknown): number {
        this._top = {
            value,
            prev: this._top,
        };
        this._size++;

        return this._size;
    }

    /**
     * Убирает верхний элемент стека. Если стек пуст - инициируется исключение.
     * @returns Возвращает верхний элемент
     */
    pop(): unknown {
        if (this._top === null)
            throw new Error('Stack is empty');

        const value = this._top.value;

        this._top = this._top.prev;
        this._size--;

        return(value);
    }

    /**
     * Возвращает верхний элемент из стека без его удаления
     * @returns Верхний элемент
     */
    peek(): unknown {
        if (this._top === null)
            throw new Error('Stack is empty');

        return(this._top.value);
    }

    /**
     * Если стек пуст, возвращает true. В противном случае – false.
     */
    isEmpty(): boolean {
        return (this._size === 0);
    }

    /**
     * Возвращает количество элементов в стеке
     * @returns Размер стека
     */
    getSize(): number {
        return this._size
    }

    /**
     * Очищает стек
     */
    clear(): void {
        this._top = null;
        this._size = 0;
    }
}
