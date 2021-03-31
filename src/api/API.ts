import HTTPTransport from "../modules/HTTPTransport";
import {SETTINGS} from "../config";

const transport = new HTTPTransport(SETTINGS.baseURL);

export default transport