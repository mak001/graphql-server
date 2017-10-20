import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import Db from '../../database';
import Person from '../model/Person';

const People = {
  type: new GraphQLList(Person),
  description: 'Gets a list of people',
  args: {
    id: {
      description: 'The id of the person to get',
      type: GraphQLInt,
    },
    email: {
      description: 'The email of the person to get',
      type: GraphQLString,
    },
  },
  resolve: (root, args) => Db.models.person.findAll({ where: args }),
};

export default People;
