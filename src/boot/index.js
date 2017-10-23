import Express from 'express';
import { createServer } from 'http';
import GraphHTTP from 'express-graphql';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars
import _ from './env';
import Schema from '../schema';

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

app.use('/graphql', GraphHTTP(req => ({
  schema: Schema,
  pretty: true,
  graphiql: true,
  context: {
    SECRET: process.env.SECRET,
    user: req.user,
  },
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
    path: '/subscriptions',
  }
));
