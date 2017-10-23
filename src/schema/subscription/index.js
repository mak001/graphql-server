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
    userRegistered: Users.userRegistered,
    userLoggedIn: Users.userLoggedIn,
  }),
});

export default Subscription;
