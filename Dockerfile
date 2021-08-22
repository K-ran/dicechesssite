FROM node:16-bullseye
WORKDIR /node_server
COPY . /node_server
RUN yarn install
RUN yarn build
RUN yarn global add serve
CMD ["serve","-p","8080","-s","build"]