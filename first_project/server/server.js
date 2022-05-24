const express = require('express')
const app = express()

app.use('/', (req, res) => {
    res.send(`OK`)
})

app.listen(3000, (req, res) => {
    console.log(`App listening on port 3000`)
})