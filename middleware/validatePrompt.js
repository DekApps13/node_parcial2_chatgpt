const validatePrompt = (req, res, next)=>{
    const mensaje = req.body.mensaje

    if(mensaje == "")
        return res.status(400).json({status:"GPT no puede recibir una pregunta vacia"})
    
    next()
}

module.exports = validatePrompt
