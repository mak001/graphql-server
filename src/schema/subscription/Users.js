import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Db, { DBUser } from '../../database';
import User from '../model/User';
import { pubsub } from './';
import { USER_REGISTERED } from './SubscriptionTypes';

const userRegistered = {
  type: User,
  description: 'Updates when a user registers',
  subscribe: () => pubsub.asyncIterator(USER_REGISTERED),
};

export { userRegistered };
