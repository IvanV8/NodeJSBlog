import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register
export const register = async(req, res) => {
    try {

        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.status(402).json({
                message: 'Данный username уже занят.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
                username,
                password: hash,
            }

        )

        await newUser.save()

        res.json({
            newUser,
            message: 'Регистрация прошла успешно',
        })

    } catch (error) {
        res.json(error.message)
    }
}


// login
export const login = async(req, res) => {
    try {

        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({
                message: "User dosen't exist"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect)
            return res.json({
                message: 'Wrong password'

            })
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.json({
            token,
            user,
            message: 'Youre signed in'
        })

    } catch (error) {}
}


//me
export const getMe = async(req, res) => {
    try {

        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({
                message: "User dosen't exist"
            })
        }
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.json({
            user,
            token
        })
    } catch (error) {
        res.json({ message: 'Authorization error' })
    }
}