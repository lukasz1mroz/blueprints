FROM node:20 as base

LABEL project.name="blueprints"
SHELL ["/bin/bash", "-c"]

FROM base as npm-install

COPY package.json /tmp/package.json
RUN rm -rf /tmp/node_modules && \
    cd /tmp && npm i && \
    npx modclean -n default:safe -r

FROM base as install

RUN node -v
RUN mkdir -p /app
COPY --from=npm-install /tmp/node_modules /app/node_modules
COPY . /app
WORKDIR /app
RUN ["npm", "run", "build"]
CMD ["npm", "run", "serve"]
