# Веб-приложение "Чат"

Статус публикации ветки "deploy":

[![Netlify Status](https://api.netlify.com/api/v1/badges/7f512a89-baca-419b-b911-22eaeadc6aa8/deploy-status)](https://app.netlify.com/sites/competent-payne-8c0936/deploys)

## Назначение

Учебный проект в 1-го блока курса "Мидл фронтенд-разработчик" от Яндекс.Практикум

## Актуальная версия

 - Деплой: https://competent-payne-8c0936.netlify.app
 - Исходники: [v2.0.1](https://github.com/jasper7466/mf.messenger.praktikum.yandex/tree/v2.0.1)
 
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
 <summary>Изображения макета экранов (кликните, чтобы развернуть)</summary>
 <details>
  <summary>Вход и регистрация</summary>
  <p>Форма входа</p>
  <img src="./docpics/ui/login.png" alt="Форма входа" title="Форма входа">
  <p>Страница входа</p>
  <img src="./docpics/ui/login-screen.png" alt="Страница входа" title="Страница входа">
  <p>Страница регистрации</p>
  <img src="./docpics/ui/signup.png" alt="Страница регистрации" title="Страница регистрации">
 </details>
 <details>
  <summary>Чат</summary>
  <p>Выбор чата</p>
  <img src="./docpics/ui/chat-select.png" alt="Выбор чата" title="Выбор чата">
  <p>Чат</p>
  <img src="./docpics/ui/chat-main.png" alt="Чат" title="Чат">
  <p>Поиск</p>
  <img src="./docpics/ui/chat-find.png" alt="Поиск" title="Поиск">
  <p>Функции чата</p>
  <img src="./docpics/ui/chat-options.png" alt="Функции чата" title="Функции чата">
  <p>Действия в чате</p>
  <img src="./docpics/ui/chat-options-popup.png" alt="Действия в чате" title="Действия в чате">
 </details>
 <details>
  <summary>Профиль</summary>
  <p>Профиль</p>
  <img src="./docpics/ui/profile-main.png" alt="Профиль" title="Профиль">
  <p>Изменить данные</p>
  <img src="./docpics/ui/profile-edit-data.png" alt="Изменить данные" title="Изменить данные">
  <p>Изменить пароль</p>
  <img src="./docpics/ui/profile-edit-password.png" alt="Изменить пароль" title="Изменить пароль">
  <p>Аватар</p>
  <img src="./docpics/ui/profile-avatar.png" alt="Аватар" title="Аватар">
  <p>Загрузить аватар</p>
  <img src="./docpics/ui/profile-avatar-upload.png" alt="Загрузить аватар" title="Загрузить аватар">
 </details>
 <details>
  <summary>Страницы кодов состояния</summary>
  <p>Страница 404</p>
  <img src="./docpics/ui/page404.png" alt="Страница 404" title="Страница 404">
  <p>Страница 500</p>
  <img src="./docpics/ui/page500.png" alt="Страница 500" title="Страница 500">
 </details>
</details>

## Как развернуть проект

Установка пакетов осуществляется через [Node Package Manager (NPM)](https://nodejs.org/en/download/).

Версии пакетов и их зависимостей зафиксированы в файлах `package.json` и `package-lock.json`, для автоматической установки достаточно выполнить команду `npm install` в корневой директории проекта.

В конфигурационном файле настроены следующие варианты запуска сборки проекта:

 - **npm run compile**` - Компиляция. Файлы статики и необходимые ассеты копируются в директорию `./dist` с сохранением структуры каталогов, запускается компиляция ts-файлов с сохранением полученных js-файлов в ту же директорию `./dist`.

Для запуска локального сервера, раздающего статику (полученную после запуска скрипта компиляции) на порту 4000 - выполните команду:

`node server.js` 

## История изменений

<details>
    <summary>v1.0.0 - Спринт 1</summary>

        - Создана заготовка описания проекта
        - Добавлены изображения макета экранов приложения
        - Настроен Express-сервер с раздачей статики
        - Настроен автодеплой на Netlify из ветки deploy
        - Свёрстаны основные экраны приложения
        - Реализован вывод данных форм в консоль по событию "submit"
        - Реализована временная навигация по экранам посредством ссылок

 </details>
<details>
    <summary>v2.0.0 - Спринт 2</summary>

        - Незначительно изменена файловая структура проекта
        - Внедрён TypeScript, настроен скрипт компиляции статики и ts-файлов
        - Изменён билд-конфиг для публикации на Netlify
        - Подключен шаблонизатор Handlebars
        - Реализованы модули "EventBus" и "Component"
        - Реализован и переиспользован компонент "Button"
        - Реализован модуль валидации форм, настроена валидация основных форм

 </details>
<details>
    <summary>v2.0.1 - Спринт 2, рефакторинг после ревью</summary>

        - Вся статика вынесена в корень проекта в директорию "./static"
        - Директория "./static" вновь добавлена в git-индекс (т.к. в ней теперь тоже исходники)
        - Поправлены некоторые относительные пути в соответствии с изменённой структурой каталогов
        - Перенастроен скрипт "сборки" (как и прежде: продукты сборки помещаются в ./dist, туда же копируются исходники статики)
        - Поправлен конфиг express-сервера
        - Удалён незавершённый и неиспользуемый в проекте самописный модуль шаблонизатора
 </details>

## Технологии

 - HTML5
 - JS
 - CSS
 - Git