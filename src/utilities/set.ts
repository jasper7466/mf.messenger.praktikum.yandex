import { PlainObject } from "../types";
import merge from "./merge";
import isPlainObject from "./isPlainObject";

/**
 * Утилита, которая получает путь к вложенному свойству объекта
 * и устанавливает значение в это свойство.
 * Если поля не существует, оно создаётся по указанному пути.
 * Если целевая сущность не является объектом - выбрасывается исключение.
 * @param destination - изменяемый объект
 * @param path - путь
 * @param data - значение
 */
export default function set(destination: PlainObject | unknown[], path: string, data: unknown): PlainObject | unknown[] {
    if (!isPlainObject(destination) && !Array.isArray(destination))
        throw new Error(`set: Type of "destination" must be object or array`);

    // Если пишем в корень объекта "destination"
    if (path === '') {
        // Проверка, что не пишем объект в массив или наоборот
        if (Array.isArray(destination) !== Array.isArray(data))
            throw new Error(
                `set: In case of empty path, if type one of "data/destination" is array, other must be same type`
            );

        // Если пишем в корень объекта "destination", то аргумент "data" должен быть объектом
        if (!isPlainObject(data) && !Array.isArray(data))
            throw new Error(`set: Type of "data" must be object in case of empty path`);

        return merge(destination, data);
    }

    if (Array.isArray(destination))
        throw new Error(`set: Attempt to set custom key of array`);

    // Общий случай
    const pathParts = path.split('.');
    const node = pathParts.reduceRight((previous, current, i, parts) => {
        current = current.trim();
        if (current === '')
            throw new Error(`set: Invalid path "${path}"`);
        return { [current]: i === parts.length - 1 ? data : previous };
    }, {});

    return merge(destination, node);
}
