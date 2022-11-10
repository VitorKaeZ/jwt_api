import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class AuthController {
    static home(req, res) {
        res.status(200).json({msg: "Bem vindo a nossa api!"})
    }

    static async registerPost(req, res) {
        const { name, email, password } = req.body

    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!'})
    }
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!'})
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatório!'})
    }
    const userExists = await User.findOne({ email:email })

    if (userExists) {
        return res.status(422).json({ msg: 'Por Favor, utilize outro e-mail!'})
    }

    // create password 
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user 
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {
        
        await user.save()

        res.status(201).json({ msg: 'Registrado com sucesso!' })

    } catch (error) {
        res.status(500).json({ msg: error })
    }

    }
    static async loginPost(req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório!'})
        }
        if (!password) {
            return res.status(422).json({ msg: 'A senha é obrigatório!'})
        }
        const user = await User.findOne({ email:email })

        if (!user) {
            return res.status(422).json({ msg: 'Usuário não encontrado!'})
        }
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha Inválida!' })
        }

        try {
            
            const secret = process.env.SECRET

            const token = jwt.sign({
                id: user._id
            }, secret,
            )

            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token})

        } catch (error) {
            res.status(500).json({ msg: error })
        }
    }

        static async getUser(req, res) {

            const id = req.params.id

            const user = await User.findById(id, '-password')

            if(!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado' })
            }
            res.status(200).json({ user })
        }
}

