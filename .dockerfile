FROM node:12

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
RUN npm run build

# копируем исходный код
COPY . /

ENV PORT=4000

EXPOSE 4000

CMD npm install express && node server.js