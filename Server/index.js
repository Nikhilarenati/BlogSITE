require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const userRoutes=require("./routes/User1");
const blogRoutes=require("./routes/blog2")
const cors=require("cors")
const app=express();
const PORT = process.env.PORT || 8000;

//Mongoose connection:
mongoose.connect(process.env.MONGO_URI)
.then (()=>{
    console.log("MogoDb connected sucessfully");
})
.catch((err)=>{
    console.log("mongoDB error failed",err);
})

//middleware:
app.use(cors())
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(express.json({ limit: '30mb' })); // Built-in alternative to body-parser
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/user',userRoutes);
app.use('/blog',blogRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
 
