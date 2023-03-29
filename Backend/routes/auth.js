const express=require('express');
const router=express.Router();


//all authentication code is written here
router.get('/',(req,res)=>{
    let obj={
        name:'Argha Golui',
        rollno:'ECE2019062'
    }
    res.json(obj);
})

module.exports=router