const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET="arghaisabadb$oy";

//create a user using POST: /api/auth/createuser     login does not require

//all authentication code is written here
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be alteast of 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are error return bad request and the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user already exists or not
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({"error":"sorry, this user already exists"});
        }

        const salt = await bcrypt.genSaltSync(10);
        let secPass=await bcrypt.hash(req.body.password,salt);

        user = await User.create({
          name: req.body.name,
          email: secPass,
          password: req.body.password,
        })

        const data={
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,JWT_SECRET);
        res.json(user);
        console.log(token);
        
    } catch (error) {
        res.status(400).json({"message":error.message});
    }
    
    // .then((user) => res.json(user)).catch((err)=>{
    //     res.json({"error":"you do not use duplicate request","message":err.message});
    //     console.log("Duplicate data can not be inserted");
    // });
    // res.send(req.body);
    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
  }
);

module.exports = router;
