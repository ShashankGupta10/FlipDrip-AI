const express = require("express");
const { connection } = require("./connection/db");
require("dotenv").config()
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/products.routes");
const paymentControllers = require("./controllers/paymentControllers");
const { cartRouter } = require("./routes/cart.routes");
// const paytmChecksum = require("./paytm/PaytmChecksum");
// const { addPaymentGateway } = require("./controllers/paytm-controllers");
// const { addPaymentGateway } = require("./controllers/paytm-controllers");
// const  { PaytmChecksum} = require("./paytm/PaytmChecksum")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users",userRouter)
app.use("/products",productRouter)
app.use("/cart", cartRouter)


// app.post("/payment",addPaymentGateway)
app.post("/orders",paymentControllers.orders);
app.post("/verify",paymentControllers.verify);

app.listen(process.env.port,async()=>{
    try {
      await connection
      console.log("connected to db!")
    } catch (error) {
     console.log("unable to connect db!")
     console.log(error)
    }
   console.log(`app is running at port ${process.env.port}`)
 })






 