import User from '../model/User';
import { pubsub } from './';
import { USER_REGISTERED, USER_LOGGED_IN } from './SubscriptionTypes';

const userRegistered = {
  type: User,
  description: 'Updates when a user registers',
  subscribe: () => pubsub.asyncIterator(USER_REGISTERED),
};

const userLoggedIn = {
  type: User,
  description: 'Updates when a user logs in',
  subscribe: () => pubsub.asyncIterator(USER_LOGGED_IN),
};

export { userRegistered, userLoggedIn };
