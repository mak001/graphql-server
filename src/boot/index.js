import Express from 'express';
import GraphHTTP from 'express-graphql';

// eslint-disable-next-line no-unused-vars
import _ from './env';
import Schema from '../schema';

const PORT = process.env.PORT || 3000;

const app = Express();

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

app.use('/docs', Express.static('graphdoc'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

