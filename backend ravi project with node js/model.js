const mongoose= require("mongoose")

const Rdata =mongoose.Schema({
    itemname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    des:{
        type:String,
        required:true
    },
   
    
   
})


module.exports = mongoose.model("vamshiiiiiiiiiiiiiiiii",Rdata)

//  module.exports = mongoose.model("orderstable",order)



// const mongoose = require("mongoose");

// const RdataSchema = mongoose.Schema({
//     itemname: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     des: {
//         type: String,
//         required: true
//     },
// });



// const Rdata = mongoose.model("vamshiiiiiiiiiiiiiiiii", RdataSchema);;

// module.exports = { Rdata};
