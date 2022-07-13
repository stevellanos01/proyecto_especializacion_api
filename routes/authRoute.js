const { Router } = require("express")
const router = Router();
const Role = require("../helpers/role");

const AuthController = require("../controllers/authController");

const authorize = require('../middlewares/authorize');

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/protected', authorize([Role.User, Role.Admin]), (req, res) => {
    res.send("Ruta protegida");
});

module.exports = router;