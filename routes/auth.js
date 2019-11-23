const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../model')

async function ass(req, res, next){
    let user = await User.findById(req.session.userId)
    user ? res.redirect(`/u/${user.username}`) : next()
}

router.get('/', ass, (req, res) => res.render('authLogin'))
router.post('/', ass, async (req, res) => {
    const { username, password } = req.body
    let user = await User.findOne({ username })

    if(!user){
        res.json(`Данный пользователь не найден 404`).send()
    }else{
        let compare = await bcrypt.compareSync(password, user.password)
        if(compare){
            req.session.userId = user._id
            res.redirect(`/u/${user.username}`)
        }else{
            res.json(`Не верный пароль`).send()
        }
    }
})

router.get('/register', ass, (req, res) => res.render('authRegister'))
router.post('/register', ass, async (req, res) => {
    const { username, first_name, email, password } = req.body

    let user = await User.findOne({ username })

    if(user){
        res.json(`Данный юзер занят другим пользователям`).send()
    }else{
        let hash = await bcrypt.hash(password[0] || password[1], 14)
        user = new User({ username, first_name, email, password: hash })
        user.save()

        req.session.userId = user._id
        res.redirect(`/u/${user.username}`)
    }
})

router.get('/u/:username', async (req, res) => {
    let user = await User.findOne({ username: req.params.username })

    if(user){
        if(user._id == req.session.userId){
            res.render('userProfile', { user, u: true })
        }else{
            res.render('userProfile', { user, u: false })
        }
    }else{
        res.json(`Данный пользователь не найден 404`).send()
    }
})

router.get('/exit', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router