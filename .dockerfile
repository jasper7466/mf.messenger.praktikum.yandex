FROM node:12

# создание директории приложения
WORKDIR /app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
RUN npm run build

# копируем исходный код
COPY . .

CMD [ "node", "server.js" ]