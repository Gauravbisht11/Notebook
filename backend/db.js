const mongoose=require('mongoose')
const mongooseURI="mongodb+srv://Gauravbisht:fnIG92q3Tzbp0IWz@cluster0.y1hmiwd.mongodb.net/?retryWrites=true&w=majority"

// mongodb://127.0.0.1:27017
const connectToMongo=()=>{
    mongoose.connect(mongooseURI)
    // console.log('hello')
    }

module.exports=connectToMongo;
