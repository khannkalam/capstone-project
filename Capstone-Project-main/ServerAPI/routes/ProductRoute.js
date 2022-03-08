const express = require('express')
const product = require('../controllers/ProductController')
const router = express.Router()


router.get('/getProduct', product.findAll);

router.get('/getProductByID/:id', product.findById);

router.post('/addProduct', product.addProduct);

router.put('/updateProduct/:id', product.updateById);

router.delete('/deleteProduct/:id', product.removeById);


module.exports = router