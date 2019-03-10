import { Server } from './server';
import { Store } from './store';

import { Pool, ClientConfig } from 'pg';

import * as grpc from 'grpc';

const configuration: ClientConfig = {
  host: process.env.BLUNDERLIST_COMMENT_GCLOUD_SQLPROXY_SERVICE_HOST,
  port: parseInt(process.env.BLUNDERLIST_COMMENT_GCLOUD_SQLPROXY_SERVICE_PORT as string),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
}

process.on('SIGINT', function() {
  process.exit();
});

const db = new Pool(configuration);
const store = new Store(db);

const service = new Server(store);
const servicePort = process.env.BLUNDERLIST_COMMENT_SERVICE_PORT as string

service.serve(servicePort)
