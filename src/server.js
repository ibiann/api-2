/* password: Ns91Nhphc5xFN69U */
import express from 'express';
import { connectDB } from './config/mongodb';
import { env } from './config/environment'
import { BoardModel } from './models/board.model'

connectDB()
    .then(() => console.log('Connecting to server successfully!!!'))
    .then(() => rootServer())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

const rootServer = () => {
    const app = express()

    app.get('/test', async (req, res) => {
        let fakeData = {
            title: 'trungpc'
        }
        const newBoard = await BoardModel.createNew(fakeData)
        console.log(newBoard)

        res.end('<h1>Hello!!!</h1><hr/>')
    })
    
    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello ${env.APP_HOST}:${env.APP_PORT}/`)
    })
}
