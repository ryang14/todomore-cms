FROM node:11 AS builder

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm build

FROM node:11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY --from=builder /usr/src/app/__sapper__/build ./__sapper__/build
COPY --from=builder /usr/src/app/static ./static

EXPOSE 3000

CMD [ "npm", "start" ]