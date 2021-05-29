import { PlainObject } from "../types";

/**
 * Утилита для проверки, что переданный аргумент является простым объектом
 * @param value - проверяемый аргумент
 */
export default function isComplexObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor !== Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
