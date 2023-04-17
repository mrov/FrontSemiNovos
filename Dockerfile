FROM node:18.14-alpine AS build

WORKDIR /frontseminovos

COPY package.json .

RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production

RUN echo "PORT=${PORT}" >> .env

RUN echo "REACT_APP_API_URI=${REACT_APP_API_URI}" >> .env

RUN echo "NODE_ENV=production" >> .env

RUN cat .env

EXPOSE ${PORT}

CMD ["npm", "start"]