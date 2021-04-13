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

EXPOSE 4000

CMD [ "node", "server.js" ]
