export const SETTINGS = {
    baseURL: 'https://ya-praktikum.tech/api/v2',
}

export const storeMap = {
    errorPageProps: 'store.errorPage',
    chatPageProps: 'store.chatPage',
    chatsList: 'store.chatsList',

}

type ErrorsDescription = { [key: string]: string };

export const httpErrorCodes: ErrorsDescription = {
    500: 'Мы уже фиксим',
    404: 'Не туда попали',
    400: 'Некорректный запрос',
    default: 'Что-то пошло не так'
}

export default SETTINGS;