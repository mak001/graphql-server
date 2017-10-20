import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import GraphQLDate from 'graphql-date';

import Post from './Post';

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a person',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'The id of the person',
      resolve: person => person.id,
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the person',
      resolve: person => person.firstName,
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the person',
      resolve: person => person.lastName,
    },
    fullName: {
      type: GraphQLString,
      description: 'The full name of the person',
      resolve: person => `${person.firstName} ${person.lastName}`,
    },
    email: {
      type: GraphQLString,
      description: 'The email of the person',
      resolve: person => person.email,
    },
    createdAt: {
      type: GraphQLDate,
      description: 'The date and time the person was created',
      resolve: person => person.createdAt,
    },
    posts: {
      type: new GraphQLList(Post),
      description: 'All the posts related to this person',
      resolve: person => person.getPosts(),
    },
  }),
});

export default Person;
