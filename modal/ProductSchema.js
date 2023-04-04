const Sequelize=require('sequelize');
const db=require('../config/mssmConnection');
const pendingProduct=require('../modal/pendingProductsSchema');

const Product=db.define('Product',{
product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
},
product_title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  product_img: {
    type: Sequelize.STRING,
    allowNull: false
  },
  product_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_company : {
    type: Sequelize.STRING,
    allowNull: false
  },
  product_info : {
    type: Sequelize.STRING(4000),
    allowNull: false
  },
product_inCart:{
    type:Sequelize.BOOLEAN,
    allowNull:true,
},
product_count:{
    type:Sequelize.INTEGER,
    allowNull:true
},
product_total:{
    type:Sequelize.INTEGER,
    allowNull:true
},
product_quantity:{
    type:Sequelize.INTEGER,
    allowNull:true,

},

pending_product_id:{
  type:Sequelize.INTEGER,
  allowNull:true,

},

product_createdAt: {
  type: Sequelize.DATE,
  allowNull:true,
  field: 'product_createdAt'
},
product_updatedAt: {
  type: Sequelize.DATE,
  allowNull:true,
  field: 'product_updatedAt'
},
},{
Sequelize,
modelName: 'Product',
timestamps: false,
hooks:{       
  beforeCreate: (product, options) => {
        product.product_inCart = false; 
        product.product_count = 0; 
        product.product_total = 0;
        // product.pending_product_id = null; 
        product.product_createdAt = Sequelize.literal('CURRENT_TIMESTAMP'); 
        product.product_updatedAt = Sequelize.literal('CURRENT_TIMESTAMP'); 
      }      
}
});

pendingProduct.hasOne(Product,{foreignKey:{
  name:'pending_product_id',
  type: Sequelize.INTEGER,
  allowNull:true
}},{onDelete:'CASCADE'});

// Product.belongsTo(pendingProduct,{foreignKey:{
//   name:'pending_product_id',
//   type: Sequelize.INTEGER,
//   allowNull:true
// }},{onDelete:'CASCADE'});





module.exports=Product