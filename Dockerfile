FROM node:0.10.40

MAINTAINER Guzman Monne (https://github.com/guzmonne)

ENV NODE_VERSION="0.10.40"

RUN mkdir /app

RUN npm install -g forever

ADD ["dist/meteorApp.tar.gz", "/app"]

RUN cd /app/bundle/programs/server && ls -l && npm install

EXPOSE 8080

WORKDIR /app/bundle

ENV MONGO_URL='mongodb://ubuntu-mongo-1.conapps.local,ubuntu-mongo-2.conapps.local,ubuntu-mongo-3.conapps.local/conapps-prod'
ENV MONGO_OPLOG_URL='mongodb://oplogger:c0n4t3l@ubuntu-mongo-1.conapps.local,ubuntu-mongo-2.conapps.local,ubuntu-mongo-3.conapps.local/local?authSource=conapps-prod'
ENV ROOT_URL='http://www.conapps.local'
ENV MAIL_URL='smtrp://conapps:conatel@conapps.local:25/'
ENV PORT='8080'

CMD ["forever", "main.js"]
