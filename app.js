require("dotenv").config()
const express = require("express")
const app = express()
const userRuta = require("./routes/user")
const chatgptRuta = require("./routes/chatgpt")

//Middleware
app.use(express.json())
app.use("/user", userRuta)
app.use("/chatgpt", chatgptRuta)


app.listen(process.env.PORT, ()=>{
    console.log("Servidor iniciado")
})