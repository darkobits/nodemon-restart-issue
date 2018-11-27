FROM node:10.12

RUN apt-get update && apt-get install -y sudo

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"

RUN npm install -g nodemon --no-optional
