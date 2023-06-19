const express = require("express")
const byc = require("bcryptjs")
const router = express.Router()
const MongoConnect = require("../MongoConnect")
const userModel = require("../models/userModel")

const validateToken = require("../middleware/validateToken")

MongoConnect()

//Rutas para /user

router.post("/", async(req, res)=>{
    try{
        var {user, password, name} = req.body
        const salt = byc.genSaltSync(10)
        password = byc.hashSync(password, salt)
        const date_create = Date()

        const n_user = new userModel({user, salt, password, name, date_create})
        await n_user.save()
        return res.status(201).json(n_user)
    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.get("/:id", validateToken, async (req, res)=>{
    try{
        
    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.put("/:id", (req, res)=>{
    try{

    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.delete("/:id", (req, res)=>{
    try{

    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

module.exports = router
