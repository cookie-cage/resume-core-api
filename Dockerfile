FROM node:8.0.0-alpine

MAINTAINER Cookie Cage

WORKDIR /opt/app

# download dependencies
COPY node_modules node_modules
COPY package.json package.json
RUN npm install

# copy application
COPY .env .env
COPY middlewares middlewares
COPY models models
COPY resources resources
COPY services services
COPY index.js index.js
COPY routes.js routes.js
COPY README.md README.md

HEALTHCHECK --interval=10s --timeout=3s \
    CMD curl -f http://localhost/healthcheck || exit 1

CMD ["npm", "start"]
