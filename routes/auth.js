const router = require('express').Router()
const user = require('../model/user')
const jwtSecretKey = process.env.JWT_SECRET;
const User = require('../model/user')
const bcrypt = require("bcrypt")



router.post('/register', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            password: hashPassword,
            email: req.body.email
        })
        const user = await newUser.save()
        res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(error)

    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        console.log(user, "line 34")
      // const user = await User.findOne({$or:[{username:req.body.User}, {email:req.body.username}]}.select(+password))
        !user && res.status(400).json("Wrong credentials!");
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials!");

        const accessToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
                {expiresIn:"3d"}
            );

    
        const {password, ...others} = user._doc
        res.status(200).json({others, accessToken})
    } catch (error) {
        return res.status(500).json(error)

    }


})

module.exports = router;