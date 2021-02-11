# Веб-приложение "Чат"

[![Netlify Status](https://api.netlify.com/api/v1/badges/7f512a89-baca-419b-b911-22eaeadc6aa8/deploy-status)](https://app.netlify.com/sites/competent-payne-8c0936/deploys)

## Назначение

Учебный проект в 1-го блока курса "Мидл фронтенд-разработчик" от Яндекс.Практикум

## Актуальная версия

 - Деплой: https://competent-payne-8c0936.netlify.app
 - Исходники: [v1.0.0](https://github.com/jasper7466/mf.messenger.praktikum.yandex/tree/v1.0.0)
 
## Краткое описание

Проект представляет собой SPA-приложение, реализующее функционал чата со следующими экранами:

- Аторизация
- Регистрация
- Список чатов
- Чат
- Профиль
- Страница 404
- Страница 5**

## Исходные данные для разработки

В качестве макета прототипа использован дизайн, предложенный образовательной платформой с незначительными доработками.

- Макет в Figma: https://www.figma.com/file/WWatgxaRSJ86THRxGmKn3i/Chat-(modified)

<details>
 <summary>Изображения макета экранов</summary>
  <details>
   <summary>Вход и регистрация</summary>
   <img src="./docpics/ui/login.png" alt="Форма входа" title="Форма входа">
   <img src="./docpics/ui/login-screen.png" alt="Страница входа" title="Страница входа">
   <img src="./docpics/ui/signup.png" alt="Страница регистрации" title="Страница регистрации">
  </details>
  <details>
    <summary>Чат</summary>
    <img src="./docpics/ui/chat-select.png" alt="Выбор чата" title="Выбор чата">
    <img src="./docpics/ui/chat-select.png" alt="Чат" title="Чат">
    <img src="./docpics/ui/chat-find.png" alt="Поиск" title="Поиск">
    <img src="./docpics/ui/chat-options.png" alt="Функции чата" title="Функции чата">
    <img src="./docpics/ui/chat-options-popup.png" alt="Действия в чате" title="Действия в чате">
  </details>
  <details>
   <summary>Профиль</summary>
   <img src="./docpics/ui/profile-main.png" alt="Профиль" title="Профиль">
   <img src="./docpics/ui/profile-edit-data.png" alt="Изменить данные" title="Изменить данные">
   <img src="./docpics/ui/profile-edit-password.png" alt="Изменить пароль" title="Изменить пароль">
   <img src="./docpics/ui/profile-avatar.png" alt="Аватар" title="Аватар">
   <img src="./docpics/ui/profile-avatar-upload.png" alt="Загрузить аватар" title="Загрузить аватар">
  </details>
  <details>
   <summary>Страницы кодов состояния</summary>
   <img src="./docpics/ui/page400.png" alt="Страница 400" title="Страница 400">
   <img src="./docpics/ui/page500.png" alt="Страница 500" title="Страница 500">
  </details>
</details>

## Как развернуть проект

Проект собирается с помощью статического модульного сборщика Webpack (ещё не реализовано).

Установка пакетов осуществляется через [Node Package Manager (NPM)](https://nodejs.org/en/download/).

Версии пакетов и их зависимостей зафиксированы в файлах `package.json` и `package-lock.json`, для автоматической установки достаточно выполнить команду `npm install` в корневой директории проекта.

В конфигурационном файле (будут) настроены следующие варианты запуска сборки проекта:

 - **npm run build** - Компиляция. Проект собирается локально, продукты сборки сохряняются в указанной директории (в моём случае это "./dist").
 - **npm run dev** - Отладка. Проект запускается на локальном сервере с автоматической "горячей" пересборкой и перезагрузкой при внесении изменений в исходные коды.
 - **npm run deploy** - Релиз. Проект собирается и публикуется.

## Технологии

 - HTML5
 - JS
 - CSS
 - Git
 - Webpack

## Известные проблемы и что можно улучшить