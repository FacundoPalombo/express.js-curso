//Imports
const express = require('express')
const app = express();
const path = require('path')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const {
    logError,
    clientErrorHandler,
    errorHandler,
    wrapErrors
} = require('./utils/middlewares/errorHandlers')
const isRequestAjaxOrApi = require('./utils/scripts/isRequestAjaxOrApi')
const boom = require('boom')

//Middlewares
app.use(express.json()); //body parser

//Port
const port = process.env.PORT || 4200;

//Static files
app.use('/static', express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.redirect('/products');
})

//Routes
app.use('/api/products', productsApiRouter)
app.use('/products', productsRouter)

//Settings
//---. View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//|-Middlewares
app.use((req, res, next)=> {
    if(isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound()
        res.status(statusCode).json(payload)
    }
    res.status(404).render('404')
})
//|--|Error handlers

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(wrapErrors);

//Server initialization
const server = app.listen(port, ()=> {
    console.log(`Server on port ${port}`)
})