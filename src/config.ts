import FormValidator from "@modules/FormValidator";

export const SETTINGS = {
    baseURL: 'https://ya-praktikum.tech/api/v2',
    wssURL: 'wss://ya-praktikum.tech/ws',
    avatarDummy: '../images/avatar-dummy2.png'
}

export const storeMap = {
    errorPageProps: 'store.errorPage',
    chatPageProps: 'store.chatPage',
    profilePageProps: 'store.profile',
    chatList: 'store.chatPage.chats',
    activeChatFeed: 'store.chatPage.feed',
    activeChatID: 'store.activeChatID',
    activeChatToken: 'store.activeChatToken',
    activeChatAvatar: 'store.chatPage.chat.image',
    activeChatName: 'store.chatPage.chat.name',
    currentUserID: 'store.userID'
}

type ErrorsDescription = { [key: string]: string };

export const httpErrorCodes: ErrorsDescription = {
    500: 'Мы уже фиксим',
    404: 'Не туда попали',
    400: 'Некорректный запрос',
    default: 'Что-то пошло не так'
}

export const profileValidationRules = {
    email: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.EMAIL
    ],
    login: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    first_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    second_name: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHABETIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ],
    phone: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PHONE,
    ],
    password: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH.MIN_LENGTH_8,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_LOWER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_UPPER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_NUMERIC,
        FormValidator.CHECKS.MAX_LENGTH
    ],
    verify_password: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH.MIN_LENGTH_8,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_LOWER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_UPPER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_NUMERIC,
        FormValidator.CHECKS.MAX_LENGTH
    ]
}

export const loginValidationRules = {
    login: [
        FormValidator.CHECKS.MIN_LENGTH,
        FormValidator.CHECKS.MAX_LENGTH,
        FormValidator.CHECKS.ALPHANUMERIC
    ],
    password: [FormValidator.CHECKS.REQUIRED]
}

export const passwordValidationRules = {
    oldPassword: [
        FormValidator.CHECKS.REQUIRED,
    ],
    newPassword: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH.MIN_LENGTH_8,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_LOWER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_UPPER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_NUMERIC,
        FormValidator.CHECKS.MAX_LENGTH
    ],
    verifyPassword: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.PASSWORD_STRENGTH.MIN_LENGTH_8,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_LOWER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_UPPER_CASE,
        FormValidator.CHECKS.PASSWORD_STRENGTH.USE_NUMERIC,
        FormValidator.CHECKS.MAX_LENGTH
    ]
}

export const chatNameValidationRules = {
    title: [
        FormValidator.CHECKS.REQUIRED,
        FormValidator.CHECKS.ALPHANUMERIC,
        FormValidator.CHECKS.MAX_LENGTH,
    ]
}

export const demoUsers = {
    user1: {
        login: 'RbdEz8E2KV',
        password: 'RbdEz8E2KV',
    },
    user2: {
        login: 'VEjb9ws4CZ',
        password: 'VEjb9ws4CZ',
    }
}
