import Post from '../model/Post';
import { pubsub } from './';
import { POST_CREATED, POST_UPDATED } from './SubscriptionTypes';

const postCreated = {
  type: Post,
  description: 'Updates when a post is created',
  subscribe: () => pubsub.asyncIterator(POST_CREATED),
};

const postUpdated = {
  type: Post,
  description: 'Updates when a post is updated',
  subscribe: () => pubsub.asyncIterator(POST_UPDATED),
};

export { postCreated, postUpdated };
