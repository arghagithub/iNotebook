const express = require("express");
const User = require("../models/User");
const fetchuser=require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "arghaisabadb$oy";

//create a user using POST: /api/auth/createuser     login does not require

// Route 1: all authentication code is written here
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
    //if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user already exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry, this user already exists" });
      }

      const salt = await bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      res.json({ token: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
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

// Route 2: authenticate user using POST /api/auth/login  : no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blanked").exists(),
  ],
  async (req, res) => {
    //if there are error return bad request and the error
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success:success, error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success:success, error: "please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      res.json({success:true, token: token, message: "succesfully logged in" });
    } catch (error) {
      return res.status(400).json({success:success, error: "Internal server error" });
    }
  }
);

//Route 3: Get logged in user details using POST: /api/auth/getuser   login required

router.post("/getuser",fetchuser, async (req, res) => {
  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
});

module.exports = router;
