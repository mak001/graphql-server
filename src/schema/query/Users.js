import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Db, { DBUser } from '../../database';
import User from '../model/User';

const Users = {
  type: new GraphQLList(User),
  description: 'Gets a list of users',
  args: {
    id: {
      description: 'The id of the user to get',
      type: GraphQLInt,
    },
    email: {
      description: 'The email of the user to get',
      type: GraphQLString,
    },
  },
  resolve: (root, args) => Db.models.user.findAll({ where: args }),
};

const Me = {
  type: User,
  description: 'Gets the current user',
  resolve: (_, args, { user }) => {
    if (!user) {
      return null;
    }
    return DBUser.findById(user.id);
  },
};

export { Users, Me };
