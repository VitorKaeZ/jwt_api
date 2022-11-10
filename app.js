import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/authRoutes.js'
dotenv.config()

const app = express()

//JSON response
app.use(express.json())
app.use('/', router)



// Credencials
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster-teste.uu9rvup.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000, () => console.log('API ONLINE!'))
    console.log('Conectado ao Banco de Dados!')
}).catch((err) => console.log(err))

