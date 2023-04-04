const Sequelize=require('sequelize');
const db=require('../config/mssmConnection');

const Mpesa=db.define('Mpesa',{
mpesa_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
},
mpesa_number: {
    type: Sequelize.STRING,
    allowNull: false
  },
mpesa_trnxid: {
    type: Sequelize.STRING,
    allowNull: false
  },

mpesa_amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
mpesa_createdAt: {
  type: Sequelize.DATE,
  allowNull:true,
  field: 'mpesa_createdAt'
},
mpesa_updatedAt: {
  type: Sequelize.DATE,
  allowNull:true,
  field: 'mpesa_updatedAt'
},
},{
Sequelize,
modelName: 'Mpesa',
timestamps: false,
hooks:{       
  beforeCreate: (mpesa, options) => {
        mpesa.mpesa_createdAt = Sequelize.literal('CURRENT_TIMESTAMP'); 
        mpesa.mpesa_updatedAt = Sequelize.literal('CURRENT_TIMESTAMP'); 
      }      
} 
});

module.exports=Mpesa