const mongoose= require("mongoose")

const orderdata =mongoose.Schema({
    orderedItemname:{
        type:String,
        required:true
    },
    orderedprice:{
        type:Number,
        required:true
    },
    ordereddes:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
    
   
})


module.exports = mongoose.model("orderstable",orderdata)





