# Веб-приложение "Чат"

Статус публикации ветки "deploy":

[![Netlify Status](https://api.netlify.com/api/v1/badges/7f512a89-baca-419b-b911-22eaeadc6aa8/deploy-status)](https://app.netlify.com/sites/competent-payne-8c0936/deploys)

## Назначение

Яндекс.Практикум. Учебный проект 1-го блока курса "Мидл фронтенд-разработчик"

## Актуальная версия

 - Деплой Netlify: https://competent-payne-8c0936.netlify.app
 - Деплой Heroku: https://ymf-chat.herokuapp.com
 - Исходники: [v4.0.1](https://github.com/jasper7466/mf.messenger.praktikum.yandex/tree/v4.0.1)

## Краткое описание

Проект представляет собой SPA-приложение, реализующее функционал чата со следующими экранами:

- Аторизация
- Регистрация
- Чат
- Профиль
- Страница HTTP-кодов ошибок

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

Версии пакетов и их зависимостей зафиксированы в файлах *package.json* и *package-lock.json*, для их автоматической установки выполните команду `npm install` в корневой директории проекта.

В конфигурационном файле настроены следующие варианты скриптов автоматизации:

- `npm run dev` - сборка в режиме разработки (оптимизация не выполняется)
- `npm run watch` - сборка в режиме разработки с рекомпиляцией при изменении исходных кодов
- `npm run open` - сборка в режиме разработки с автозапуском в браузере
- `npm run build` - сборка продакшн-бандла
- `npm run start` - запуск локального сервера с раздачей статики
- `npm run test` - запуск авто-тестов
- `npm run eslint` - запуск линтинга кода
- `npm run eslint:fix` - авто-исправление ошибок линтинга кода
- `npm run stylelint` - запуск линтинга стилей
- `npm run stylelint:fix` - авто-исправление ошибок линтинга стилей
- `npm run precommit` - запуск проверок перед коммитом
- `npm run prepush` - запуск проверок перед отправкой в удалённый репозиторий

## История изменений

<details>
    <summary>v1.0.0 - Спринт 1</summary>
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/1">Pull request</a>

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
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/2">Pull request</a>

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
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/3">Pull request</a>

    - Вся статика вынесена в корень проекта в директорию "./static"
    - Директория "./static" вновь добавлена в git-индекс (т.к. в ней теперь тоже исходники)
    - Поправлены некоторые относительные пути в соответствии с изменённой структурой каталогов
    - Перенастроен скрипт "сборки" (как и прежде: продукты сборки помещаются в ./dist, туда же копируются исходники статики)
    - Поправлен конфиг express-сервера
    - Удалён незавершённый и неиспользуемый в проекте самописный модуль шаблонизатора
</details>
<details>
    <summary>v3.0.0 - Спринт 3, частичная реализация</summary>
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/4">Pull request</a>

    - Реализованы классы HTTPTransport и некоторые API
    - Реализованы классы Route, Router и роутинг
    - Реализована подстановка расширений в импортах *.ts-файлов при компиляции
    - Реализовано хранилище Store (частично)
    - Реализован класс Controller
    - Немного дополнен жизненный цикл компонента
    - Довёрстаны модальные окна
    - Частично реализовано сопряжение UI приложения с API
</details>
<details>
    <summary>v3.0.1 - Спринт 3, исправления после ревью, доработка</summary>
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/5">Pull request</a>

    - Для API создан базовый класс с обработчиком ошибок транспорта
    - Реализована обработка перехода на несуществующий раут
    - В контроллерах страниц добавлен try-catch отлов ошибок асинхронных операций для нотации async-await
    - Настроен запуск авто-тестов
    - Добавлена поддержка JSDOM
    - Написаны тесты для модулей Component и Router
    - Исправлены замечания ревью
</details>
<details>
    <summary>v4.0.0 - Спринт 4, частичная реализация</summary>
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/6">Pull request</a>

    - Настроен Webpack
    - Настроена Docker-сборка
    - Проект размещён в Heroku
    - Настроен ESLint и precommit
    - Подключен WebSocket
</details>
<details>
    <summary>v4.0.1 - Доработки</summary>
    <a href="https://github.com/jasper7466/mf.messenger.praktikum.yandex/pull/7">Pull request</a>

    - Исправлена проблема потери роута при обновлении страницы
    - Реализован класс Stack
    - Реализованы утилиты:
        - isObject
        - isPlainObject
        - isComplexObject
        - cloneDeep (через стек)
        - merge
        - set
        - xssEscape
        - splitTimestamp
    - Переработан и дополнен класс Store
    - Изменён жизненный цикл компонента в классе Component
    - Исправлены ошибки правил валидации в классе FormValidator
    - Реализован класс WebSocketTransport
    - Доделана поддержка live-сообщений
    - Частично реализовано документирование (TSDoc) и покрытие тестами
    - Незначительно модифицирована конфигурация webpack
    - Проведён аудит уязвимостей, устранить удалось не все
    - Подключен ESlint и StyleLint
    - Настроен Husky, запуск литеров на pre-commit и unit-тестов на pre-push
    - Добавлена возможность авторизации под двумя тестовыми пользователями
    - Исправлены проблемы работы/отображения некоторых элементов интерфейса
    - Обновлён readme
</details>

## Технологии и инструменты

 - HTML5 / CSS
 - JS / TS
 - Webpack
 - Mocha / Chai
 - ESLint / StyleLint
 - Husky
 - Docker
 - Express
 - Netlify / Heroku
 - Git
