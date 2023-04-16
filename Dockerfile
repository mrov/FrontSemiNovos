FROM node:18.14

WORKDIR /frontseminovos

COPY package.json .

RUN echo "PORT=${PORT}" >> .env

RUN echo "REACT_APP_API_URI=${REACT_APP_API_URI}" >> .env

RUN cat .env

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]