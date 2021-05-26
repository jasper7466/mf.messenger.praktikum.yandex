import { StringObject } from "../types";

const htmlEscapes: StringObject = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

const findEx = /[&<>"']/g;

export default function xssEscape(markup: string) {
    return markup.replace(findEx, match => htmlEscapes[match]);
}
