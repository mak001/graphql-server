import {
  GraphQLList,
} from 'graphql';

import Db, { DBPerson } from '../../database';
import Post from '../model/Post';

const Posts = {
  type: new GraphQLList(Post),
  description: 'Gets a list of posts',
  resolve: (root, args) => Db.models.post.findAll({
    where: args,
    include: [{
      model: DBPerson,
      // this is needed because deleted people return without it
      where: {
        deletedAt: null,
      },
    }],
  }),
};

export default Posts;
