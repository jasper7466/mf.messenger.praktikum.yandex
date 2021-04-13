FROM node:12

# создание директории приложения
WORKDIR /app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install

# копируем исходный код
COPY . .
RUN npm run build

ENV PORT=4000

EXPOSE 4000

CMD [ "node", "server.js" ]