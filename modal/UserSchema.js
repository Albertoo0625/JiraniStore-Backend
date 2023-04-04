const Sequelize=require('sequelize');
const db = require('../config/mssmConnection');


const User = db.define('User', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_roles: {
    type: Sequelize.STRING,
    allowNull: true
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_refreshToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  user_createdAt: {
    type: Sequelize.DATE,
    allowNull:true,
    field: 'user_createdAt'
  },
  user_updatedAt: {
    type: Sequelize.DATE,
    allowNull:true,
    field: 'user_updatedAt'
  },
},{
  Sequelize,
  modelName: 'User',
  timestamps: false,
  hooks:{       
    beforeCreate: (user, options) => {
          user.user_roles = '{"User":2001}'; 
          user.user_createdAt = Sequelize.literal('CURRENT_TIMESTAMP'); 
          user.user_updatedAt = Sequelize.literal('CURRENT_TIMESTAMP');
        }      
}
});



module.exports= User;
