import {
  GraphQLObjectType,
} from 'graphql';
import { PubSub } from 'graphql-subscriptions';

import * as Users from './Users';
import * as Posts from './Posts';

const pubsub = new PubSub();
export { pubsub };

const Subscription = new GraphQLObjectType({
  name: 'Subscription',
  description: 'This is a root query',
  fields: () => ({
    // user
    userRegistered: Users.userRegistered,
    userLoggedIn: Users.userLoggedIn,

    // post
    postCreated: Posts.postCreated,
    postUpdated: Posts.postUpdated,
  }),
});

export default Subscription;
