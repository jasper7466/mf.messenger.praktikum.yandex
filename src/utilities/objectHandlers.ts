export type Indexed<T = unknown> = {
    [key in string]: T;
};

export function isObject(variable: any) {
    if (typeof variable === 'object' && variable !== null)
        return true;
    return false;
}

export function merge(lhs: any, rhs: any): Indexed {
    for (let key in rhs) {
        if (isObject(lhs[key]))
            lhs[key] = merge(lhs[key], rhs[key]);
        else
            lhs[key] = rhs[key];
    }
    return lhs;
}

export function set(object: Indexed, path: string, data: unknown): Indexed | unknown {
    if (!isObject(object))
        return object;
    if (typeof path !== 'string')
        throw new Error ('path must be string');
    const arr = path.split('.');
    const obj: Indexed = arr.reduceRight((prev, cur, i, arr) => ({[cur]: i === arr.length - 1 ? data : prev}), {})
    const merged: Indexed = merge(obj, object as Indexed)
    object[arr[0]] = merged[arr[0]]
    return object
}