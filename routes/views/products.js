const router = require('express').Router();
const ProductsService = require('../../services/products')
const productService = new ProductsService()
router.get('/', (req, res, next) => {
    const {tags} = req.query;
    try {
        const products = productService.getProducts({tags})
        res.render('products', {products})
    } catch (error) {
        next(error)
    }
})

module.exports = router;