const Sequelize = require('sequelize');

const db = new Sequelize('JiraniStore', 'albertoo', 'albertoo', {
  host: 'localhost',
  dialect: 'mssql',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports=db




