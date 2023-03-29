const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({"error":"sorry, this user already exists"});
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    
    res.json({"ok":"data is succesfully inserted"});
    
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
