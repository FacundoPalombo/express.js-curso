const router = require('express').Router();
const ProductsService = require('../../services/products')

const productsService = new ProductsService();

router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
        const product = await productsService.getProducts({
            tags
        });
        res.status(200).json({
            data: product,
            message: 'products listed'
        })
    } catch (error) {
        next(error)
    }
})

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const product = await productsService.getProduct({ productId })
        res.status(200).json({
            data: product,
            message: 'products retrieved'
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { info } = req.body;
    try {
        const product = productsService.createProduct({ info })
        res.status(201).json({
            data: product,
            message: 'product created'
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;
    try {
        const updatedProduct = productsService.updateProduct({ productId , product })
        res.status(200).json({
            data: updatedProduct,
            message: 'product updated'
        })
    } catch (error) {
        next(error)
    }
})

router.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;
    try {
        const patchedProduct = productsService.patchProduct({ productId , product })
        res.status(200).json({
            data: patchedProduct,
            message: 'product patched'
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        res.status(200).json({
            data: product,
            message: 'product deleted'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;