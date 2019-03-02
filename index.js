const expressJsx = require('./express.jsx')
const app = require('express')()
const port = process.env.PORT || 4200;

app.engine('jsx', expressJsx);

app.set('views', './views');
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
    res.render('index', {
        hello: 'hola',
        world: 'mundo'
    })
})

const server = app.listen(port, () => {
    console.log(`Server on port ${port}`)
})