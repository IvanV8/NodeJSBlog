import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

//const

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_SERVER = process.env.DB_SERVER
const DB_NAME = process.env.DB_NAME

async function start() {


    try {

        const connectionpOptions = {
            dbName: `${DB_NAME}`

        }
        await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_SERVER}:27017`, connectionpOptions)
        console.log('Connected Successfully')


        //middleware
        app.use(cors())
        app.use(express.json())


        app.use('/api/auth', authRoute)

        app.get('/', (req, res) => {
            res.send('Hello!')
        })

        app.listen(PORT), () => {
            console.log(`Server started on port:  ${PORT}`)
        }

    } catch (error) {
        console.log(error);
    }

}


start()