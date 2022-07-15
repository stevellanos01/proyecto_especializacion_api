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
    
async function crearUsuarios(user) {
    //console.log(user.username)
    let email = user.username + "@email.com";
    let username = user.username;
    let session = user.sessions;
    const isEmailExist = await User.findOne({ email:email });
    const isUsernameExist = await User.findOne({ username: username });
    if (isEmailExist) {
     console.log('Email ya registrado' )
    } else if(isUsernameExist){
      console.log('Username ya registrado')
    }
    // Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(username, salt);
    // Se crea nuevo usuario
    const newUser = new User({
    username: username,
    email: (username +"@email.com"),
    password: password,
    role: "User",
    session:session
    })
    User.create(newUser).then(() => {
        console.log('Registro exitoso');
        
    })

}
async function cantidadUsuarios(req, res) {
    const users = req.body
    users.forEach((user) => {
        console.log(user.username)
        crearUsuarios(user)
        //crearUsuarios(user)
    }
    );
    res.status(201).send('Exitoso');
}

/*     users.map.forEach(user =>(
        let contador = 0;
        console.log(user)
        console.log(contador++)
      //  crearUsuarios(user)
        )) */
async function borrarRepetidos() {
    var ObjectId = require('mongodb').ObjectId;
    const users = await User.find();
    users.forEach((user => {
        User.deleteMany({ _id: ObjectId(user._id) })
            .then(function () {
            console.log("Data deleted"); // Success
        })
         
    }
        ))
  
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
    cantidadUsuarios,
    borrarRepetidos
   
};