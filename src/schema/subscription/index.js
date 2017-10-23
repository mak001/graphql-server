import {
  GraphQLObjectType,
} from 'graphql';
import { PubSub } from 'graphql-subscriptions';

import * as Users from './Users';

const pubsub = new PubSub();
export { pubsub };

const Subscription = new GraphQLObjectType({
  name: 'Subscription',
  description: 'This is a root query',
  fields: () => ({
    userAdded: Users.userRegistered,
  }),
});

export default Subscription;
