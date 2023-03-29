const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//create a user using POST: /api/auth/ does not require auth

//all authentication code is written here
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be alteast of 8 characters").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => res.json(user)).catch((err)=>{
        res.json({"error":"you do not use duplicate request","message":err.message});
        console.log("Duplicate data can not be inserted");
    });
    // res.send(req.body);
    // console.log(req.body);
    // const user=User(req.body);
    // user.save();
  }
);

module.exports = router;
