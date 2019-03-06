FROM tomasbasham/node:12.3.1 as builder

RUN apk add --no-cache ca-certificates gcc \
  && npm config set unsafe-perm true \
  && npm install -g typescript@3.4.5 tslint

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN tsc

FROM tomasbasham/node:12.3.1

COPY package.json .
COPY package-lock.json .

# Rebuild for production only.
RUN apk add --no-cache libstdc++ \
  && npm install --production

COPY --from=builder /usr/src/app/dist /usr/src/app/
COPY --from=builder /etc/ssl/certs /etc/ssl/certs

ENTRYPOINT ["node", "/usr/src/app/index.js"]
