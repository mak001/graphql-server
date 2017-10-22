import {
  GraphQLObjectType,
} from 'graphql';

import { Users, Me } from './Users';
import Posts from './Posts';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    users: Users,
    me: Me,
    posts: Posts,
  }),
});

export default Query;
