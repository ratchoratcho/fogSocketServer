FROM node:10-alpine
WORKDIR /src/
EXPOSE 4000 5000
COPY . .
RUN npm install && mkdir system
ENTRYPOINT ["node", "server.js"]