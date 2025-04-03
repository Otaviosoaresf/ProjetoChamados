const express = require("express");
const {
    criarChamado,
    listarChamado,
    obterChamado,
    atualizarChamado,
    deletarChamado,
} = require("../controllers/chamadoController");

const { proteger, verificarAtendente } = require("../middlewares/authMiddleware");
const { validarChamado, validarAtualizacaoChamado } = require("../middlewares/validacoesChamado");
const tratarErrosValidacao = require("../middlewares/tratarErros");

const router = express.Router();

router.post("/", proteger, validarChamado, tratarErrosValidacao, criarChamado);
router.get("/", proteger, verificarAtendente, listarChamado);
router.get("/:id", proteger, obterChamado);
router.put("/:id", proteger, verificarAtendente, validarAtualizacaoChamado, tratarErrosValidacao, atualizarChamado);
router.delete("/:id", proteger, verificarAtendente, deletarChamado);

module.exports = router;