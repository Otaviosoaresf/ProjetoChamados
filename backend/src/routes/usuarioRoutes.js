const express = require("express");
const {
    registraUsuario,
    loginUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    deletarUsuario,
    atualizarPerfil,
} = require("../controllers/usuarioController")

const { proteger, verificarAtendente } = require("../middlewares/authMiddleware");
const { validarRegistro, validarLogin } = require("../middlewares/validacoesUsuario");
const tratarErrosValidacao = require("../middlewares/tratarErros");

const router = express.Router();

router.post("/registro", validarRegistro, tratarErrosValidacao, registraUsuario);
router.post("/login", validarLogin, tratarErrosValidacao, loginUsuario);


router.get("/", proteger, verificarAtendente, listarUsuarios);
router.put("/perfil", proteger, atualizarPerfil)
router.get("/:id", proteger, buscarUsuario);
router.put("/:id", proteger, atualizarUsuario);
router.delete("/:id", proteger, verificarAtendente, deletarUsuario)

module.exports = router;