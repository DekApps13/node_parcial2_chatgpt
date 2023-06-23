const express = require("express")
const router = express.Router()
const MongoConnect = require("../MongoConnect")
const axios = require("axios")
const chatgptModel = require("../models/chatgptModel")

//Middleware
const validateToken = require("../middleware/validateToken")
const validatePrompt = require("../middleware/validatePrompt")

MongoConnect()

//Rutas para /chatgpt
router.post("/", validateToken, validatePrompt, (req, res)=>{
    const {mensaje, id_user} =  req.body; // Obtener el mensaje enviado por el cliente en el cuerpo de la solicitud
    const apiUrl = process.env.APIURL; 
    const apiKey = process.env.APIKEY;

    // Configuración de los parámetros que se envian a la API de GPT
    axios.post(apiUrl, {
        "model": "gpt-3.5-turbo",
        "messages": [{ role: "system", "content": mensaje }],
        "temperature": 0.7,
        "max_tokens": 3000,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(async (answer) => {
            //Se preparan los datos para hacer un insert en la Colección chatgpts
            const prompt = mensaje
            const date_create = new Date()
            const response = answer.data.choices[0].message.content;

            const ask_gpt = new chatgptModel({prompt, response, id_user, date_create})
            await ask_gpt.save()

            res.status(200).send(response); // Enviar la respuesta generada por el modelo de lenguaje al cliente
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Ha ocurrido un error en la solicitud a la API de ChatGPT');
        });
})

router.get("/:id_ask", validateToken, async (req, res)=>{
    try{
        const {id_ask} = req.params
        const ask_gpt = await chatgptModel.findById(id_ask)
        if (!ask_gpt)
            return res.status(404).json({status: ""})
        return res.status(200).json(ask_gpt)
    }catch(error){
        return res.status(500).json({status: "Ha ocurrido un error en el Servidor"})
    }
})

router.get("/user/:id_user", validateToken, async (req, res)=>{
    try{
        const {id_user} = req.params
        const chats_byUser = await chatgptModel.find({id_user: id_user})
        if (!chats_byUser)
            return res.status(404).json({status: "ID incorrecto, este usuario no existe"})
        return res.status(200).json(chats_byUser)

    }catch(error){
        return res.status(500).json({status: "Ha ocurrido un error en el Servidor"})
    }
})

module.exports = router
