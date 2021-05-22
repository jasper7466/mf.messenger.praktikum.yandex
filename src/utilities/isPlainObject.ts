import { PlainObject } from "../types";

/**
 * Утилита для проверки, является ли переданный аргумент простым объектом
 * @param value - проверяемый аргумент
 */
export default function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}
