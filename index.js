const express = require("express");

const app = express();

app.get('/' , (req,res) => {
    res.send('Hello World')
});

app.get('/about', (req, res) => {
    res.send(`Hello ${req.query.name}`)
})

const port = 8000
app.listen(port, console.log(`Server started on ${port}`))
