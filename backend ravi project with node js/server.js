const express = require("express")
const app = express();
const mongoose= require("mongoose")
const Rdata = require('./model')
const orderdata = require('./ordermodel')
const signed=require('./signing')
const { ObjectId } = require('mongodb');
const cors =require('cors')
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://bedadhaanvith1997:bedadhaanvith1997@cluster0.jrdl1ra.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    (res)=>{console.log("mongodb database connection successfully")},
    (err)=>{console.log("connection failed for mongo")})



app.post('/users',async function(req, res) {
  try {

    const {firstname,lastname,username,email,password,phone}=req.body
   
     const  exist = await signed.findOne({username:req.body.username})
     if(exist){
      return res.status(401).json({ message: "username existed" });
     }
      if (!firstname || !lastname || !username, !email || !password || !phone) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      const dta = new signed({ firstname,lastname,username,email,password,phone});
     
      await dta.save();

      const orders = await signed.find().lean();
      return res.json(orders);
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Internal server error" });
  }
})


app.post("/loginusers",async function(req, res) {
  try {

    const {email,password,username}=req.body;
   
     const  user = await signed.findOne({username:username,password:password,email:email})
     if(user){
      return res.status(401).json({ message: `${username} login successfully` });
     }
     else{
      return res.status(401).json({ message: "novalid details" });
     }
     

     
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: "no user" });
  }
})
app.get("/",function(req,res){
    res.send("<h1>Hello welcome to zelar</h1>")
})



app.get("/students", async function(req, res) {
  try {
      const getdata = await Rdata.find();
      return res.json(getdata);
  } catch (err) {
      return res.send("no data here");
  }
});

// app.get("/students/:name_",async function(req,res){
//     try{
//          const getdata =await Rdata.findById(req.params.name_);
//          console.log(getdata)
//         return res.json(getdata)
//     } catch(err){
//         return res.send("no particular data here")
//     }  
// })
app.get("/students/:id", async function (req, res) {
    try {
      console.log("top", req.params.id)
      const filter1 = new ObjectId(req.params.id);
      console.log("filterrrr111111111", filter1)
      const filter = { _id: req.params.id};
      const student = await Rdata.findOne(filter);
  
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      return res.json(student);
    } catch (err) {
      console.error("Error fetching student:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


app.post("/students", async function(req, res) {
  try {
      const { itemname, price, des } = req.body;
      if (!itemname || !price || !des) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      const dta = new Rdata({ itemname, price, des });
     
      await dta.save();

      const orders = await Rdata.find().lean();
      return res.json(orders);
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Internal server error" });
  }
});


// orders table onlyyy
app.post("/orders", async function(req, res) {
  try {
      const {  orderedItemname, orderedprice, ordereddes,date } = req.body;
      console.log( orderedItemname, orderedprice, ordereddes,date)
      if (!orderedItemname || !orderedprice || !ordereddes || !date)  {
          return res.status(400).json({ error: "Missing required fields" });
      }

      const dta = new orderdata({ orderedItemname, orderedprice, ordereddes ,date});
     
      await dta.save();

      const orders = await orderdata.find().lean();
      return res.json(orders);
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: "Internal server error" });
  }
});

////multiple items of an array storing
// app.post("/orders", async function(req, res) {
//   try {
//     const ordering = req.body; // Assuming req.body is an array of objects
    
//     if (!Array.isArray(ordering) || ordering.length === 0) {
//       return res.status(400).json({ error: "Invalid or empty request data" });
//     }

//     // Use the map function to create an array of Orderdata instances
//     const ordersPromises = ordering.map(async (order) => {
//       const { orderedItemname, orderedprice, ordereddes, date } = order;
      
//       if (!orderedItemname || !orderedprice || !ordereddes || !date) {
//         // If any required field is missing in an order, skip it
//         return null;
//       }

//       const newOrder = new orderdata({
//         orderedItemname: orderedItemname,
//         orderedprice: orderedprice,
//         ordereddes: ordereddes,
//         date: new Date(date),
//       });

//       await newOrder.save();
//       return newOrder;
//     });

//     // Use Promise.all to wait for all order saves to complete
//     const savedOrders = await Promise.all(ordersPromises);

//     // Filter out null values (orders with missing required fields)
//     const validOrders = savedOrders.filter(order => order !== null);

//     const orders = await orderdata.find().lean();
//     return res.json(orders);
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });



app.get("/orders", async function(req, res) {
  try {
      const getdata = await orderdata.find();
      return res.json(getdata);
  } catch (err) {
      return res.send("no data here");
  }
});
//================================================================

app.delete("/students/:id", async function (req, res) {
  try {
   
    console.log("top", req.params.id)
    const filter1 = new ObjectId(req.params.id);
    console.log("filterrrr111111111", filter1)
    const filter = { _id: req.params.id};
    const deletedStudent = await Rdata.deleteOne(filter);

    if (deletedStudent.deletedCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Now, fetch and return the updated list of students
    const updatedData = await Rdata.find();
    return res.json(updatedData);
  } catch (err) {
    console.error("Error deleting student:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



  
// app.put("/students/:id", async function (req, res) {
//   const id = req.params.id;
//   const { itemname, price, des } = req.body;

//   try {
//     const updatedData = await Rdata.updateMany(
//       { _id: id }, // Filter by _id
//       { $set: { itemname, price, des } } // Update fields using $set
//     );

//     if (updatedData.nModified === 0) {
//       return res.status(404).json({ error: "Student not found" });
//     }

//     res.json(updatedData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.put("/students/:id",async function(req,res){
// let id = req.params.id
// const { itemname, price, des } = req.body;
 
//   try{
//        const updateddata = await Rdata.updateMany(
//               { id: id},
//               { $set:
//                   { itemname: itemname, price: price,des:des }
//                },
//               { new: true } // To return the updated document
//           )
//           if (!updateddata) {
//               res.status(404).json({ error: "Mobile not found" });
//             } else {
//               res.json(updateddata);
//             }
// }catch(err){
//       console.log(err)
//   }
// })
app.put("/students/:id", async function(req, res) {
  const id = req.params.id;
  const { itemname, price, des } = req.body;
  console.log(itemname, price, des)
  console.log(itemname, price, des)
  try {
      const updateddata = await Rdata.findOneAndUpdate(
          { _id: id },
          { $set: { itemname, price, des } },
          { new: true }
      );

      if (!updateddata) {
          return res.status(404).json({ error: "Mobile not found" });
      } else {
          return res.json(updateddata);
      }
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
  }
});






app.listen(8000,function(){
    console.log("server connection estabkished succesfully..........................")
})





