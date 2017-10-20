import Sequelize from 'sequelize';

const Connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST,
    operatorsAliases: false,
    define: {
      paranoid: true,
    },
  }
);

export default Connection;
