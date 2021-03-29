export const SETTINGS = {
    baseURL: 'https://ya-praktikum.tech/api/v2',
    avatarDummy: '../images/avatar-dummy2.png'
}

export const storeMap = {
    errorPageProps: 'store.errorPage',
    chatPageProps: 'store.chatPage',
    chatsList: 'store.chatsList',
    profilePageProps: 'store.profile'
}

type ErrorsDescription = { [key: string]: string };

export const httpErrorCodes: ErrorsDescription = {
    500: 'Мы уже фиксим',
    404: 'Не туда попали',
    400: 'Некорректный запрос',
    default: 'Что-то пошло не так'
}

export default SETTINGS;