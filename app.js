import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.get('/', async (req, res) => {
    res.status(200).json({msg: "Bem vindo a nossa api!"})
})

// Credencials
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster-teste.uu9rvup.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000, () => console.log('API ONLINE!'))
    console.log('Conectado ao Banco de Dados!')
}).catch((err) => console.log(err))

