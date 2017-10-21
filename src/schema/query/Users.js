import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Db from '../../database';
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

export default Users;
