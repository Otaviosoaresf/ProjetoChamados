const express = require("express");
const {
    registraUsuario,
    loginUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    deletarUsuario,
} = require("../controllers/usuarioController")

const { proteger, verificarAtendente } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/registro", registraUsuario);
router.post("/login", loginUsuario);


router.get("/", proteger, verificarAtendente, listarUsuarios);
router.get("/:id", proteger, buscarUsuario);
router.put("/:id", proteger, atualizarUsuario);
router.delete("/:id", proteger, verificarAtendente, deletarUsuario)

module.exports = router;