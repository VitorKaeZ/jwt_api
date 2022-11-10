import User from '../models/User.js'
import bcrypt from 'bcrypt'


export default class AuthController {
    static home(req, res) {
        res.status(200).json({msg: "Bem vindo a nossa api!"})
    }

    static async loginPost(req, res) {
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
}