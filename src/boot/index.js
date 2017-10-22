import Express from 'express';
import GraphHTTP from 'express-graphql';
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

