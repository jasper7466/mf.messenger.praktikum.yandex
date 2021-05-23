/**
 * Утилита для проверки, является ли переданный аргумент объектом
 * @param instance - проверяемый аргумент
 */
export default function isObject(instance: any): boolean {
    return typeof instance === 'object' && instance !== null;
}
