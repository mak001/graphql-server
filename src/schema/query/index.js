import {
  GraphQLObjectType,
} from 'graphql';

import People from './People';
import Posts from './Posts';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    people: People,
    posts: Posts,
  }),
});

export default Query;
