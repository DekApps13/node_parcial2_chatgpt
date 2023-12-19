const jwt = require("jsonwebtoken")

const validateToken = (req, res, next)=>{
    try{
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.LOCALKEY, (error, data)=>{
            if (error)
                return res.status(404).json({status: "Token invalido"})
            next()
        })
    }catch(error){
        return res.status(400).json({status: "Token de Autorizacion no fue recibido"})
    }
    
}

module.exports = validateToken