
const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017"  //localhost should be replace by this in new version
const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}
module.exports=connectToMongo;
