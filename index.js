//Imports
const express = require('express')
const app = express();
const path = require('path')
const productsRouter = require('./routes/products')
const productsApiRouter = require('./routes/api/products')

//Port
const port = process.env.PORT || 4200;

//Static files
app.use('/static', express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.send('Hello world!')
})

//Routes
app.use('/api/products', productsApiRouter)
app.use('/products', productsRouter)

//Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


//Server initialization
const server = app.listen(port, ()=> {
    console.log(`Server on port ${port}`)
})