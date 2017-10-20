import Sequelize from 'sequelize';

import Connection from '../Connection';

const Person = Connection.define('person', {
  firstName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

export default Person;
