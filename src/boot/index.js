import Express from 'express';
import { createServer } from 'http';
import GraphHTTP from 'express-graphql';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphiqlExpress } from 'graphql-server-express';
import jwt from 'jsonwebtoken';
import url from 'url';

// eslint-disable-next-line no-unused-vars
import _ from './env';
import Schema from '../schema';

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '/graphql';
const SUBSCRIPTION_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '/subscriptions';
const PORT = process.env.PORT || 3000;

const app = Express();

const addUser = async (req) => {
  const token = req.headers.authentication;
  try {
    const { user } = await jwt.verify(token, process.env.SECRET);
    req.user = user;
  } catch (err) {
    req.user = null;
  }
  req.next();
};

app.use(addUser);

app.use(GRAPHQL_ENDPOINT, GraphHTTP(req => ({
  schema: Schema,
  pretty: true,
  context: {
    SECRET: process.env.SECRET,
    user: req.user,
  },
})));

app.use('/graphiql', graphiqlExpress(req => ({
  endpointURL: GRAPHQL_ENDPOINT,
  subscriptionsEndpoint: url.format({
    host: req.get('host'),
    protocol: req.protocol === 'https' ? 'wss' : 'ws',
    pathname: SUBSCRIPTION_ENDPOINT,
  }),
})));

app.use('/docs', Express.static('graphdoc'));

const server = createServer(app);
server.listen(PORT, () => new SubscriptionServer(
  {
    execute,
    subscribe,
    schema: Schema,
  },
  {
    server,
    path: SUBSCRIPTION_ENDPOINT,
  }
));
