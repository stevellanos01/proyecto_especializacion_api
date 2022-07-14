const joi = require('@hapi/joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const schemaRegister = joi.object({
    username: joi.string().required(),
    email: joi.string().min(6).max(255).email(),
    password: joi.string().min(6).max(1024),
    role: joi.string(),
    session:joi.array()
})
    
async function crearUsuarios(req, res) {
    // Validamos que los datos cumplan con la estructura del schemaRegister
    const { error } = schemaRegister.validate(req.body)
    if (error) {
    return res.status(400).json({ error: error.details[0].message })
    }
    // Validamos que el email y username no se encuentra en nuestra base de datos
    const isEmailExist = await User.findOne({ email: req.body.username+"@email.com" });
    const isUsernameExist = await User.findOne({ username: req.body.username });
    if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' })
    } else if(isUsernameExist){
        return res.status(400).json({ error: 'Username ya registrado' })
    }
    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.username, salt);
    // Se crea nuevo usuario
    const newUser = new User({
    username: req.body.username,
    email: this.username+"@email.com",
    password: password,
    role: "User",
    session:req.body.session
    })
    User.create(newUser).then(() => {
        res.status(201).send('Registro exitoso');
        
    }).catch(error => {
        res.status(400).send({ error });
    })
}

    async function getAll(req, res) {
    const users = await User.find();
    return res.send(users.map(user => (user)));
}
async function getById(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const user = await User.findOne({_id:ObjectId( req.params.id) });
    if (!user) return res.status(404).send({ error: 'Usuario no encontrado'
    })
   // console.log(user)
    return res.send(user);
   }

   
module.exports = {
    crearUsuarios,
    getAll,
    getById,
   
};