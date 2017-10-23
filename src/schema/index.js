import {
  GraphQLSchema,
} from 'graphql';

import Query from './query';
import Mutation from './mutation';
import Subscription from './subscription';

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  subscription: Subscription,
});

export default Schema;
