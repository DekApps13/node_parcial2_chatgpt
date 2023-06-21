const validateUser = (req, res, next)=> {
    const {user, name} = req.body
    var password = req.body.password
    if (user == "")
        return res.status().json({status: ""})
    if (name == "")
        return res.status().json({status: ""})
    if ( password == "")
        return res.status().json({status: ""})
    if (user.length < 6)
        return res.status().json({status: ""})
    if (password.length < 12)
        return res.status(400).json({status: ""})
    //if () 

}

module.exports = validateUser