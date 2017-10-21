import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import Db, { DBPost, DBUser } from '../../database';
import Post from '../model/Post';

const add = {
  type: Post,
  description: 'Adds a new post',
  args: {
    personId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the person creating the post',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the post',
    },
  },
  resolve: (_, args) => DBUser.findById(args.personId)
    .then(user => user.createPost(args)),
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
  resolve: (_, args) => DBPost.findById(args.id)
    .then(post => post.update(args)),
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
