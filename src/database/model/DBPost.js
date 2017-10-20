import Sequelize from 'sequelize';

import Connection from '../Connection';

const Post = Connection.define('post', {
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

export default Post;
