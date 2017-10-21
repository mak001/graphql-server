import {
  GraphQLObjectType,
} from 'graphql';

import * as Users from './Users';
import * as Posts from './Posts';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields: () => ({
    // User mutations
    register: Users.register,
    updateUser: Users.update,
    removeUser: Users.remove,
    restoreUser: Users.restore,

    // Post mutations
    addPost: Posts.add,
    updatePost: Posts.update,
    removePost: Posts.remove,
    restorePost: Posts.restore,
  }),
});

export default Mutation;
