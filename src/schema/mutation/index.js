import {
  GraphQLObjectType,
} from 'graphql';

import * as People from './People';
import * as Posts from './Posts';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields: () => ({
    // Person mutations
    addPerson: People.addPerson,
    updatePerson: People.updatePerson,
    removePerson: People.removePerson,
    restorePerson: People.restorePerson,

    // Post mutations
    addPost: Posts.addPost,
    updatePost: Posts.updatePost,
    removePost: Posts.removePost,
    restorePost: Posts.restorePost,
  }),
});

export default Mutation;
