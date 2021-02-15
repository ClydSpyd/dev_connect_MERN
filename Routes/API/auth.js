const express = require('express')
const router = express.Router()
const auth = require("../../middleware/auth")
const User = require('../../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const { check, validationResult } = require("express-validator")


// @route     GET/auth
// @desc      test route - return user object if authenticated with auth middleware
// @access    public
router.get('/', auth, async (req,res) => {

  try {

    const user = await (await User.findById(req.user.id).select('-password'));

    res.json({user})
    
  } catch (err) {
    
    console.error(err.message)
    res.status(500).send('server error')
  }
})


// @route     POST/auth
// @desc      authenticate user & get token
// @access    public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter password').exists()
], async (req,res) =>{ 

    const errors = validationResult(req);

    if(!errors.isEmpty()){
    
      // sending default res obj
      // return res.status(400).json({ errors: errors.array()}) 

      // trimming response to just param and msg
      return res.status(400).json({ errors: errors.array().map(({msg, param}) => ({msg, param})) }) 
    }

  

    const { email, password } = req.body

    try {

    // See if user exists
    let user = await User.findOne({ email })

    if( !user ){
      return res.status(400).json({
        errors: [{
          msg:'Invalid Credentials'
        }]
      })
    }

    // check password provided matches password in db
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        errors: [{
          msg:'Invalid Credentials'
        }]
      })
    }


    // Return JWT
    const payload = { 
      user: {
        id:user.id
      }
    }

    jwt.sign(
      payload, 
      config.get("jwtSecret"),
      { expiresIn: 3600000 }, // a long time for dev
      // { expiresIn: 3600 } 1 hour in production
      (err, token) => {
        if(err) throw err;
        res.json({ token, user })
      }
      )
      
    } catch (err) {

      console.error(err.message)

      return res.status(500).send('server error')
      
    }

})


module.exports = router
