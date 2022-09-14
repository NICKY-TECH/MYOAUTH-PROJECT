const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userId:String,
    email:String,
    userName:String
})

const user=mongoose.model('user',userSchema);

module.exports={
    user
}