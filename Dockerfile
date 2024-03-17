FROM node:21-alpine

WORKDIR /app

COPY . /app

EXPOSE 3000

ENTRYPOINT [ "sh", "-c" ]

CMD ["node", "index.js"]