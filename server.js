require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
require("./db/connection")






const Products = require("./models/productSchema")
const DefaultData = require("./defaultdata.js/defaultData")
const cors = require('cors');
const Router = require("./routes/router");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(cors());
app.use(Router)





//for deployment ke liye  statc get
if(process.env.NODE_ENV === "production"){
    app.use(express.static("amazon/build"))
}


app.listen(PORT,()=>{
    console.log(`we are listening the port number is ${PORT}`)
})

DefaultData();