import express from 'express';

const app = express()

const hostname = 'localhost'
const port = 8080

/* password: Ns91Nhphc5xFN69U */
app.get('/', (req, res) => {
    res.end('<h1>Hello!</h1><hr />')
})

app.listen(port, hostname, () => {
    console.log(`Hello ${hostname}:${port}/`)
})