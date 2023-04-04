const Sequelize = require('sequelize');
const db=require('../config/mssmConnection');
const User=require('../modal/UserSchema');



const pendingProduct=db.define('pendingProduct',{
pending_product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
},
pending_product_title: {
    type: Sequelize.STRING,
    allowNull: false
  },
pending_product_img: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pending_product_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pending_product_company : {
    type: Sequelize.STRING,
    allowNull: false
  },
  pending_product_info : {
    type: Sequelize.STRING(4000),
    allowNull: false,

  },
  pending_product_inCart:{
    type:Sequelize.BOOLEAN,
    allowNull:true,
    
},
pending_product_count:{
    type:Sequelize.INTEGER,
    allowNull:true
},
pending_product_total:{
    type:Sequelize.INTEGER,
    allowNull:true
},
pending_product_quantity:{
    type:Sequelize.INTEGER,
    allowNull:true,

},
pending_product_user_id:{
  type: Sequelize.INTEGER,
  allowNull:true
},
pending_product_email:{
    type:Sequelize.STRING,
    allowNull:false,
},
pending_product_approval_status:{
  type:Sequelize.BOOLEAN,
  allowNull:true,
},
pending_product_createdAt: {
  type: Sequelize.DATE,
  allowNull:true,
  field: 'pending_product_createdAt'
},
pending_product_updatedAt: {
  type: Sequelize.DATE,
  allowNull:true,
  field: 'pending_product_updatedAt'
},
},{
Sequelize,
modelName: 'pendingProduct',
timestamps: false,
hooks:{       
  beforeCreate: (pendingProduct, options) => {
    pendingProduct.pending_product_inCart = false; 
    pendingProduct.pending_product_count = 0; 
    pendingProduct.pending_product_total = 0; 
    // pendingProduct.pending_product_user_id = 1; 
    pendingProduct.pending_product_approval_status=false;
    pendingProduct.pending_product_createdAt = Sequelize.literal('CURRENT_TIMESTAMP'); // Set default value for user_createdAt property
    pendingProduct.pending_product_updatedAt = Sequelize.literal('CURRENT_TIMESTAMP');
      }      
} 
});


User.hasOne(pendingProduct,{foreignKey:{
  name:'pending_product_user_id',
  type: Sequelize.INTEGER,
  allowNull:false
}},{onDelete:'CASCADE'});


pendingProduct.belongsTo(User,{foreignKey:{
  name:'pending_product_user_id',
  type: Sequelize.INTEGER,
  allowNull:false
}},{onDelete:'CASCADE'});

db.sync({alter:true}).then(()=>{
 
  
}).catch((err)=>{
  console.log(err)
})


module.exports=pendingProduct