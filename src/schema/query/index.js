import {
  GraphQLObjectType,
} from 'graphql';

import Users from './Users';
import Posts from './Posts';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    users: Users,
    posts: Posts,
  }),
});

export default Query;
