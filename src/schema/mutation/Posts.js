import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import { pubsub } from '../subscription/index';
import { POST_CREATED, POST_UPDATED } from '../subscription/SubscriptionTypes';
import Db, { DBPost, DBUser } from '../../database';
import Post from '../model/Post';

const add = {
  type: Post,
  description: 'Adds a new post',
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the post',
    },
  },
  resolve: (_, args, { user }) => {
    const post = DBUser.findById(user.id)
      .then(currentUser => currentUser.createPost(args));
    pubsub.publish(POST_CREATED, { postCreated: post });
    return post;
  },
};

const update = {
  type: Post,
  description: 'Updates post with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the post to update',
    },
    title: {
      type: GraphQLString,
      description: 'The new title of the post',
    },
    content: {
      type: GraphQLString,
      description: 'The new content of the post',
    },
  },
  resolve: (_, args) => {
    const post = DBPost.findById(args.id)
      .then(updatedPost => updatedPost.update(args));

    pubsub.publish(POST_UPDATED, { postUpdated: post });
    return post;
  },
};

const remove = {
  type: Post,
  description: 'Removes/deletes post with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the post to remove/delete',
    },
  },
  resolve: (_, args) => Db.models.post.destroy({ where: args })
    .then(() => DBPost.findById(args.id, { paranoid: false })),
};

const restore = {
  type: Post,
  description: 'Restores a deleted post with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the post to restore',
    },
  },
  resolve: (_, args) => Db.models.post.restore({ where: args })
    .then(() => DBPost.findById(args.id), () => null),
};

export { add, update, remove, restore };
