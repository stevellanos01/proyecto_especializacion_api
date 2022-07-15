const { Router } = require("express")
const router = Router();
const Role = require("../helpers/role");

const AuthController = require("../controllers/authController");
const userController = require("../controllers/userController");

const authorize = require('../middlewares/authorize');

router.post('/register', AuthController.register);
router.post('/crearUsuarios',userController.crearUsuarios);
router.post('/login', AuthController.login);
router.get('/getAll', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/crearUsuarios', userController.crearUsuarios);
router.post('/cantidadUsuarios', userController.cantidadUsuarios);
router.post('/borrar', userController.borrarRepetidos)


router.get('/protected', authorize([Role.User, Role.Admin]), (req, res) => {
    res.send("Ruta protegida");
    
});

module.exports = router;