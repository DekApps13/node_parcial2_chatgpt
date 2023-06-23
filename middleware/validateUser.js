const validateUser = (req, res, next)=> {
    const {user, name} = req.body
    var password = req.body.password
    if (user == "" || name == "" || password == "")
        return res.status(400).json({status: "Los Campos no deben estar vacios"})
    if (user.length < 6)
        return res.status(400).json({status: "El Usuario no debe ser menor a 5 caracteres"})
    if (password.length < 12)
        return res.status(400).json({status: "La Contraseña no debe se menor a 12 caracteres"})
    if (name.length < 4)
        return res.status(400).json({status: "El Nombre del Usuario no  debe ser menor a 4 caracteres"})
    next()

}

module.exports = validateUser