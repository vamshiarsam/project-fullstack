const mongoose= require("mongoose")

const signed =mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        min:5,
        max:20,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        min:5,
        max:20,
        trim:true,
    },
    username:{
        type:String,
        required:true,
       
        trim:true,
        index:true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
      
    },
   phone:{
    type:String,
    required:true,
   }
    
   
})


module.exports = mongoose.model("signin",signed)