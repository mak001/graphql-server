import {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import Db, { DBPerson } from '../../database';
import Person from '../model/Person';

const addPerson = {
  type: Person,
  description: 'Adds a new person',
  args: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The first name of the person to create',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The last name of the person to create',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The email of the person to create',
    },
  },
  resolve: (_, args) => Db.models.person.create({
    firstName: args.firstName,
    lastName: args.lastName,
    email: args.email.toLowerCase(),
  }),
};

const updatePerson = {
  type: Person,
  description: 'Updates person with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the person to update',
    },
    firstName: {
      type: GraphQLString,
      description: 'The new first name of the person',
    },
    lastName: {
      type: GraphQLString,
      description: 'The new last name of the person',
    },
    email: {
      type: GraphQLString,
      description: 'The new email of the person',
    },
  },
  resolve: (_, args) => DBPerson.findById(args.id)
    .then(person => person.update(args)),
};

const removePerson = {
  type: Person,
  description: 'Removes/deletes person with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the person to remove/delete',
    },
  },
  resolve: (_, args) => Db.models.person.destroy({ where: args })
    .then(() => DBPerson.findById(args.id, { paranoid: false })),
};

const restorePerson = {
  type: Person,
  description: 'Restores a deleted person with the given id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the person to restore',
    },
  },
  resolve: (_, args) => Db.models.person.restore({ where: args })
    .then(() => DBPerson.findById(args.id), () => null),
};

export { addPerson, updatePerson, removePerson, restorePerson };
