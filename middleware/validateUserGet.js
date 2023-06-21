const userModel = require("../models/userModel")

const validateUserGet = async (req, res, next)=>{
    try{
        const {id} = req.params
        const k_user = await userModel.findById(id)
        next()
    }catch(error){
        return res.status().json()
    }
    
}

module.exports = validateUserGet