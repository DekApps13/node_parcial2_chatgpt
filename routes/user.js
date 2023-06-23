const express = require("express")
const byc = require("bcryptjs")
const router = express.Router()
const MongoConnect = require("../MongoConnect")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const validateToken = require("../middleware/validateToken")
const validateUser = require("../middleware/validateUser")

MongoConnect()

//Rutas para /user
router.post("/", validateUser, async(req, res)=>{
    try{
        const {user, name} = req.body
        var password = req.body.password
        const salt = byc.genSaltSync(10)
        password = byc.hashSync(password, salt)
        const date_create = new Date()
        const c_user = new userModel({user, salt, password, name, date_create})
        await c_user.save()
        return res.status(201).json(c_user)
    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.get("/:id", validateToken,async (req, res)=>{
    try{
        const {id} = req.params
        const r_user = await userModel.findById(id)
        return res.status(200).json(r_user)
    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.put("/:id", validateToken, async (req, res)=>{
    try{
        const {id} = req.params
        const {user, password, name} = req.body

        const u_user = await userModel.findByIdAndUpdate(id, {user, password, name}, {new:true})
        if (!u_user)
            return res.status(404).json({status: "No se encontro el ID"})
        return res.status(200).json(u_user)
    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.delete("/:id", validateToken, async (req, res)=>{
    try{
        const {id} = req.params
        const d_user = await userModel.findByIdAndDelete(id)
        if (!d_user)
            return res.status(404).json({status: "No se encontro el ID"})
        return res.status(200).json(d_user)
    }catch(error){
        return res.status(500).json({status:"Error en la DDBB"})
    }
})

router.post("/login", async (req, res)=>{
    try{
        const {user, password} = req.body
        const c_user = await userModel.findOne({user: user})
        const valido = byc.compare(password, c_user.password)
        if (!valido)
            return res.status(200).json({status: "Usuario o Contraseña Incorrecto"})
        
        //Se crea el Token de Autenticacion con jwt 
        jwt.sign({c_user}, process.env.LOCALKEY, (error, token)=>{
            if (error)
                return res.status(500).json({status: "Error - Token no generado"})
            return res.status(201).json(token)
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({status:"Error en la DDBB"})
    }
})
    

module.exports = router
