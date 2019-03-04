const express = require('express')
const app = express();
const path = require('path')
const productsRouter = require('./routes/products')


const port = process.env.PORT || 4200;

app.use('/static', express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.send('Hello world!')
})

app.use('/products', productsRouter)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')



const server = app.listen(port, ()=> {
    console.log(`Server on port ${port}`)
})