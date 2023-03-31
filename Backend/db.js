const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/test?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";

const connectToMongo= ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("succesfully connected");
    }).catch(()=>{
        console.log("sorry not connect");
    });
}

module.exports=connectToMongo;