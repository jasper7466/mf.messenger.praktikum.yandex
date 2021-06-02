import { PlainObject } from "../types";
import isObject from "./isObject";
/**
 * Утилита для выполнения глубокого слияния двух объектов.
 * Сохраняются значения ключей обоих объектов.
 * Значение ключа, присутствующего в обоих объектах - перезаписывается значением из rhs-объекта.
 * Возвращаемое значение - модифицированный lhs-объект.
 * @param lhs - объект-акцептор
 * @param rhs - объект-эмиттер
 */
export default function merge(lhs: any, rhs: any): PlainObject {
    for (const key in rhs) {
        if (isObject(lhs[key]))
            lhs[key] = merge(lhs[key], rhs[key]);
        else
            lhs[key] = rhs[key];
    }

    return lhs;
}
