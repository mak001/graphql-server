import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import Db, { DBUser } from '../../database';
import User from '../model/User';

const update = {
  type: User,
  description: 'Updates user with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user to update',
    },
    firstName: {
      type: GraphQLString,
      description: 'The new first name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The new last name of the user',
    },
    email: {
      type: GraphQLString,
      description: 'The new email of the user',
    },
  },
  resolve: (_, args) => DBUser.findById(args.id)
    .then(user => user.update(args)),
};

const remove = {
  type: User,
  description: 'Removes/deletes user with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user to remove/delete',
    },
  },
  resolve: (_, args) => Db.models.user.destroy({ where: args })
    .then(() => DBUser.findById(args.id, { paranoid: false })),
};

const restore = {
  type: User,
  description: 'Restores a deleted user with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user to restore',
    },
  },
  resolve: (_, args) => Db.models.user.restore({ where: args })
    .then(() => DBUser.findById(args.id), () => null),
};

const register = {
  type: User,
  description: 'Register a user',
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The first name of the user to create',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The last name of the user to create',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The email of the user to create',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password of the user',
    },
  },
  resolve: (_, {
    firstName, lastName, email, password,
  }) =>
    // password = password;
    Db.models.user.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    })
  ,
};

export { update, remove, restore, register };
