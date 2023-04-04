const db = require('../config/mssmConnection')


// image Upload

const path = require('path')


// create main Model
const Product = require('../modal/ProductSchema');
const {Op}=require('sequelize');


// main work


const addProduct=async(req, res) => {
  const { title, img, price, company, info, quantity,pending_product_id } = req.body;

  console.log({title, img, price, company, info, quantity,pending_product_id });

  const duplicate=await Product.findOne({where:{product_img :img}});
  if(duplicate){
    return res.status(409).json("the product image already exists try renaming.");
  }else{

    const result=await Product.create({
      product_title: title,
      product_img: img,
      product_price: price,
      product_company: company,
      product_info: info,
      product_quantity: quantity,
      pending_product_id: pending_product_id,

    })
      .then(() => {
        return res.status(200).send("Form submitted successfully.");
      })
      .catch((err) => {
        return res.status(500).send(err.message)
      });

  }


}

// 1. create product

// const addProduct = async  (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send("No files were uploaded.");
//     }
  
//     const image = req.files.img;
//     const imagePath = `public/images/${image.name}`;
//     image.mv(imagePath, (err) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
  
//       Product.create({
//         title: req.body.title,
//         img: imagePath,
//         price: req.body.price,
//         company: req.body.company,
//         info: req.body.info,
//         quantity: req.body.quantity
//       })
//         .then(() => {
//           return res.status(200).send("Form submitted successfully.");
//         })
//         .catch((err) => {
//           return res.status(500).send(err);
//         });
//     });
//   }



// 2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    console.log(products);
    res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { product_id: id }})
    res.status(200).send(product)
}

// // 4. update Product

// const updateProduct = async (req, res) => {

//     let id = req.params.id

//     const product = await Product.update(req.body, { where: { product_id: id }})

//     res.status(200).send(product)
   

// }


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { inCart,count,total,quantity} = req.body;

  console.log(id);


  try {
    const product = await Product.findOne({where:{product_id:id}});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.product_inCart = inCart;
    product.product_total = total;
    product.product_count = count;
    product.product_quantity = quantity;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { product_id: id }} )

    res.status(200).send('Product is deleted !')

}

const searchProduct=async(req,res)=>{
  const term=req.params.query
  if(term=='empty'){
    const products= await Product.findAll();
    console.log(products);
    return res.status(200).json(products);
  }
  const products = await Product.findAll({
    where: {
      product_title: {
        [Op.like]: `%${term}%`,
      },
    },
  });
  return res.status(200).json(products);
}

// // 6. get published product

// const getPublishedProduct = async (req, res) => {

//     const products =  await Product.findAll({ where: { published: true }})

//     res.status(200).send(products)

// }

// // 7. connect one to many relation Product and Reviews

// const getProductReviews =  async (req, res) => {

//     const id = req.params.id

//     const data = await Product.findOne({
//         include: [{
//             model: Review,
//             as: 'review'
//         }],
//         where: { id: id }
//     })

//     res.status(200).send(data)

// }


// // 8. Upload Image Controller

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)  
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).single('image')









// module.exports = {
//     addProduct,
//     getAllProducts,
//     getOneProduct,
//     updateProduct,
//     deleteProduct,
//     getPublishedProduct,
//     getProductReviews,
//     upload
    
// }

module.exports={addProduct,
getAllProducts,
updateProduct,
getOneProduct,
deleteProduct,
searchProduct
}