import Sequelize from 'sequelize';

import Connection from '../Connection';

const User = Connection.define('user', {
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
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
