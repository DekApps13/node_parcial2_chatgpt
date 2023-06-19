const mongoose = require("mongoose")

const MongoConnect = ()=>{
    mongoose.connect(process.env.CONN_STR)
    .then(()=>{console.log("Conexion a BD exitosa")})
    .catch((error)=>{console.log(`Error: ${error}` )})
}

module.exports = MongoConnect
