import HTTPTransport from '../modules/HTTPTransport';
import SETTINGS from '../config';

export const transport = new HTTPTransport(SETTINGS.baseURL);