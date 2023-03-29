// all notes code are written here

const express=require('express');
const router=express.Router();


//all authentication code is written here
router.get('/',(req,res)=>{
    res.json([]);
})

module.exports=router