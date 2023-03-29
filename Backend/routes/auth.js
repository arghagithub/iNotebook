const express=require('express');
const User = require('../models/User');
const router=express.Router();

//create a user using POST: /api/auth/ does not require auth

//all authentication code is written here
router.post('/',(req,res)=>{
    res.send(req.body);
    console.log(req.body);
    const user=User(req.body);
    user.save();
})

module.exports=router