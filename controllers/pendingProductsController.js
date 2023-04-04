const db = require('../config/mssmConnection')



// image Upload

const path = require('path')


// create main Model
const pendingProduct = require('../modal/pendingProductsSchema');



// main work


const addPendingProduct=async(req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  

  const { title, price, company, info, quantity, email,user_id } = req.body;
  const image = req.files.img;
  const cleanProductInfo = info.replace(/[\r\n\t]/g, ' ');
console.log(image);
console.log(title, price, company, info, quantity, email);
const filepath = path.join(__dirname, '../','public', 'images', `${image.name}`);
console.log(filepath);
image.mv(filepath, (err) => {
  if (err) return res.status(500).json({ status: "error", message: err });
});

const fullFilePath=`http://localhost:3500/images/${image.name}`;

console.log(fullFilePath);

console.log({title,fullFilePath,price,company,info,quantity,email});

      const result=await pendingProduct.create({
        pending_product_title: title,
        pending_product_img: fullFilePath,
        pending_product_price: price,
        pending_product_company: company,
        pending_product_info: cleanProductInfo,
        pending_product_quantity: quantity,
        pending_product_email: email,
        pending_product_user_id: user_id,
        
      })
        .then(() => {
          return res.status(200).send("Form submitted successfully.");
        })
        .catch((err) => {
          return res.status(500).send(err.message);
        });

}





// 2. get all products

const getAllPendingProducts = async (req, res) => {

    let products = await pendingProduct.findAll({where:{pending_product_approval_status:false}})
    console.log(products);
    res.status(200).send(products)

}

// 3. get single product

const getOnePendingProduct = async (req, res) => {

    let id = req.params.id
    let product = await pendingProduct.findOne({ where: { pending_product_id: id }})
    res.status(200).send(product)

}


// // 4. update Product

// const updateProduct = async (req, res) => {

//     let id = req.params.id

//     const product = await Product.update(req.body, { where: { product_id: id }})

//     res.status(200).send(product)
   

// }


// const updatePendingProduct = async (req, res) => {
//   const { id } = req.params;
//   const { inCart,count,total,quantity} = req.body;

//   console.log(id);


//   try {
//     const product = await pendingProduct.findOne({where:{product_id:id}});
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     product.product_inCart = inCart;
//     product.product_total = total;
//     product.product_count = count;
//     product.product_quantity = quantity;
//     await product.save();
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating product' });
//   }
// };


const updatePendingProduct = async (req, res) => {
  const id=req.params.id;
  approvalStatus=req.body.approvalstatus;
console.log(approvalStatus);
  try {
    const product = await pendingProduct.findOne({where:{pending_product_id:id}});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.pending_product_approval_status = approvalStatus;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: `Error updating product ,${error.message}` });
  }

  
}

// 5. delete product by id

const deletePendingProduct = async (req, res) => {

    let id = req.params.id
    
    await pendingProduct.destroy({ where: { pending_product_id: id }} )

    res.status(200).send('Product is deleted !')

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

module.exports={addPendingProduct,
getAllPendingProducts,
updatePendingProduct,
getOnePendingProduct,
deletePendingProduct
}