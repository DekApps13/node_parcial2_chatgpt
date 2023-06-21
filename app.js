require("dotenv").config()
const express = require("express")
const app = express()
const userRuta = require("./routes/user")
const chatgptRuta = require("./routes/chatgpt")

//Middleware
app.use(express.json())
app.use("/user", userRuta)
app.use("/chatgpt", chatgptRuta)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Servidor iniciado desde el puerto ${port}`)
})