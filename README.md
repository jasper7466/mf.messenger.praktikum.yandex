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
    ![Форма входа](./docpics/ui/login.png "Форма входа")
    ![Страница входа](./docpics/ui/login-screen.png "Страница входа")
    ![Страница регистрации](./docpics/ui/signup.png "Страница регистрации")
  </details>
  <details>
    <summary>Чат</summary>
    ![Выбор чата](./docpics/ui/chat-select.png "Выбор чата")
    ![Чат](./docpics/ui/chat-select.png "Чат")
    ![Поиск](./docpics/ui/chat-find.png "Поиск")
    ![Функции чата](./docpics/ui/chat-options.png "Функции чата")
    ![Действия в чате](./docpics/ui/chat-options-popup.png "Действия в чате")
  </details>
  <details>
   <summary>Профиль</summary>
    ![Профиль](./docpics/ui/profile-main.png "Профиль")
    ![Изменить данные](./docpics/ui/profile-edit-data.png "Изменить данные")
    ![Изменить пароль](./docpics/ui/profile-edit-password.png "Изменить пароль")
    ![Аватар](./docpics/ui/profile-avatar.png "Аватар")
    ![Загрузить аватар](./docpics/ui/profile-avatar-upload.png "Загрузить аватар")
  </details>
  <details>
  <summary>Страницы кодов состояния</summary>
    ![Страница 400](./docpics/ui/page400.png "Страница 400")
    ![Страница 500](./docpics/ui/page500.png "Страница 500")
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