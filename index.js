const app = require('express')()
const port = process.env.PORT || 4200;

app.get('/', (req,res) => {
    res.send('Hello world!')
})

const server = app.listen(port, ()=> {
    console.log(`Server on port ${port}`)
})