const router = require('express').Router();
const ProductsService = require('../../services/products')
const {
    productIdSchema,
    productTagSchema,
    createProductSchema,
    updateProductSchema
} = require('../../utils/schemas/products')
const validation = require('../../utils/middlewares/validationHandler')

const productsService = new ProductsService();

router.get('/', async (req, res, next) => {
    const {
        tags
    } = req.query;
    console.log('req: ', req.query)
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
    const {
        productId
    } = req.params;
    console.log('req: ', req.params)
    try {
        const product = await productsService.getProduct({
            productId
        })
        res.status(200).json({
            data: product,
            message: 'products retrieved'
        })
    } catch (error) {
        next(error)
    }
})

router.post('/', validation(createProductSchema), async (req, res, next) => {
    const {
        body: product
    } = req;
    console.log('req: ', req)
    try {
        const createdProduct = productsService.createProduct({
            product
        })
        res.status(201).json({
            data: createdProduct,
            message: 'product created'
        })
    } catch (error) {
        next(error)
    }
})

router.put('/:productId',
    validation({
        productId: productIdSchema
    }, "params"),
    validation(updateProductSchema, "params"), async (req, res, next) => {
        const {
            productId
        } = req.params;
        const {
            body: product
        } = req;
        console.log('req: ', req.params)
        try {
            const updatedProduct = productsService.updateProduct({
                productId,
                product
            })
            res.status(200).json({
                data: updatedProduct,
                message: 'product updated'
            })
        } catch (error) {
            next(error)
        }
    })

router.patch('/:productId', async (req, res, next) => {
    const {
        productId
    } = req.params;
    const {
        body: product
    } = req;
    console.log('req: ', req.params)
    try {
        const patchedProduct = productsService.patchProduct({
            productId,
            product
        })
        res.status(200).json({
            data: patchedProduct,
            message: 'product patched'
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:productId', async (req, res, next) => {
    const {
        productId
    } = req.params;
    console.log('req: ', req.params)
    try {
        const deletedProduct = productsService.deleteProduct({
            productId
        })
        res.status(200).json({
            data: deletedProduct,
            message: 'product deleted'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;