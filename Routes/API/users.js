const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator")


const User = require('../../models/User') // user model

// @route     GET/users
// @desc      test route
// @@access   public
router.get('/', (req,res) => res.send('User Route'))

// @route     POST/users
// @desc      register user
// @@access   public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Please enter a password ith 6 or more characters').isLength({ min: 6})
], async (req,res) =>{ 

  console.log(req.body)

    const errors = validationResult(req);

    if(!errors.isEmpty()){
    
      // sending default res obj
      // return res.status(400).json({ errors: errors.array()}) 

      // trimming response to just param and msg
      return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
    }

  

    const { name, email, password } = req.body

    try {

    // See if user exists
    let user = await User.findOne({ email })

    if( user ){
      return res.status(400).json({
        errors: [{
          msg:'User already exists'
        }]
      })
    }

    // Get user's gravatar
    const avatar = gravatar.url(email, {
      s: '200', //size - default size
      r: 'pg', // rating - no rude stuff
      d: 'mm' // default - default user icon
    })

    // create user instance based on the Mongoose schema 'User' imported above
    user = new User({name, email, avatar, password}) 

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10) // generate salt using 10 reounds

    user.password = await bcrypt.hash(password, salt) // hash password using salt

    await user.save() // save user to db


    // Return JWT

    const payload = {
      user: {
        id:user.id, //although MongoDB uses '_id', Mongoose abstracts it to just 'id'
        name:user.name
      }
    }

    jwt.sign(
      payload, 
      config.get("jwtSecret"),
      { expiresIn: 3600000 }, // a long time for dev
      // { expiresIn: 3600 } 1 hour in production
      (err, token) => {
        if(err) throw err;
        res.json({ token })
      }
      )
      
    } catch (err) {

      console.error(err.message)

      return res.status(500).send('server error')
      
    }

})


module.exports = router
