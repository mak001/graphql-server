import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  resolve: async (_, args) => {
    const user = args;
    user.password = await bcrypt.hash(user.password, 12);
    user.email = user.email.toLowerCase();
    return Db.models.user.create(user);
  },
};

const login = {
  type: GraphQLString,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The email of the user to login',
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The password of the user to login',
    },
  },
  resolve: async (_, args, { SECRET }) => {
    const user = await Db.models.user.findOne({ where: { email: args.email } });
    if (!user) {
      throw new Error('No User with that email');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    return jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      SECRET,
      {
        expiresIn: '1y',
      }
    );
  },
};

export { update, remove, restore, register, login };
