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

- Макет: https://www.figma.com/file/WWatgxaRSJ86THRxGmKn3i/Chat-(modified)

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