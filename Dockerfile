FROM node:14-slim

COPY ./package*.json ./
RUN npm ci

COPY ./ .
CMD ["npm", "start"]