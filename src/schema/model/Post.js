import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import GraphQLDate from 'graphql-date';

import User from './User';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'The id of the post',
      resolve: post => post.id,
    },
    title: {
      type: GraphQLString,
      description: 'The title of the post',
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      description: 'The content of the post',
      resolve: post => post.content,
    },
    createdAt: {
      type: GraphQLDate,
      description: 'The date and time the post was created',
      resolve: post => post.createdAt,
    },
    person: {
      type: User,
      description: 'The person who created the post',
      resolve: post => post.getUser(),
    },
  }),
});

export default Post;
