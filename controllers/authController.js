const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const User = require('../models/user');

const schemaRegister = joi.object({
    username: joi.string().required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1024).required(),
    role: joi.string().required(),
    session:joi.array()
    })
    async function register(req, res) {
    // Validamos que los datos cumplan con la estructura del schemaRegister
    const { error } = schemaRegister.validate(req.body)
    if (error) {
    return res.status(400).json({ error: error.details[0].message })
    }
    // Validamos que el email y username no se encuentra en nuestra base de datos
    const isEmailExist = await User.findOne({ email: req.body.email });
    const isUsernameExist = await User.findOne({ username: req.body.username });
    if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' })
    } else if(isUsernameExist){
        return res.status(400).json({ error: 'Username ya registrado' })
    }
    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // Se crea nuevo usuario
    const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
    role: req.body.role,
    session:req.body.session
    })
    User.create(newUser).then(() => {
        res.status(201).send('Registro exitoso');
        
    }).catch(error => {
        res.status(400).send({ error });
    })
}

const schemaLogin = joi.object({
    //email: joi.string().min(6).max(255).required().email(),
    username: joi.string().required(),
    password: joi.string().min(6).max(1024).required()
    })

async function login(req, res) {
// Validamos los datos  
const { error } = schemaLogin.validate(req.body);
if (error) return res.status(400).json({ error: error.details[0].message});

// Buscamos el usuario en la base de datos
//const user = await User.findOne({ email: req.body.email });
const user = await User.findOne({ username: req.body.username });
if (!user) return res.status(400).json({ error: 'Usuario no encontrado'});

const validPassword = await bcrypt.compare(req.body.password, user.password);

if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });
// Se crea el token
const token = jwt.sign({
    id: user._id,
    username: user.username
    }, process.env.TOKEN_SECRET);
    res.json({ user, token });
}


module.exports = {
    register,
    login
};