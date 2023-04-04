const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_secret="lucid$dream"

router.post('/createuser', [
  body('name', 'Enter valid name!').isLength({ min: 3 }),
  body('email', 'Enter valid email id!').isEmail(),
  body('password', 'Password must have atleast 5 characters').isLength({ min: 5 }),
]
  , async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
             let user= await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ email: 'Sorry another user already exist with this email!' })

      }

      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
     const data={
       user:{
         id:user.id
       }
     }
      const authtoken=jwt.sign(data,JWT_secret)
      res.json(authtoken)
    
    } catch (error) {
       console.error(error.message);
    }
    

    

  })
module.exports = router