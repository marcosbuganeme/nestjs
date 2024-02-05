FROM node:18-slim

WORKDIR /home/node

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]
