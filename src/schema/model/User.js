import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import GraphQLDate from 'graphql-date';

import Post from './Post';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'The id of the user',
      resolve: user => user.id,
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
      resolve: user => user.firstName,
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user',
      resolve: user => user.lastName,
    },
    fullName: {
      type: GraphQLString,
      description: 'The full name of the user',
      resolve: user => `${user.firstName} ${user.lastName}`,
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user',
      resolve: user => user.email,
    },
    createdAt: {
      type: GraphQLDate,
      description: 'The date and time the user was created',
      resolve: user => user.createdAt,
    },
    posts: {
      type: new GraphQLList(Post),
      description: 'All the posts related to this user',
      resolve: user => user.getPosts(),
    },
  }),
});

export default User;
