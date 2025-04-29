const express = require("express");
const {
    criarChamado,
    listarChamado,
    obterChamado,
    assumirChamado,
    resolverChamado,
    excluirChamadoCliente,
    obterEstatisticas,
    listarChamadosDoCliente
} = require("../controllers/chamadoController");

const { proteger, verificarAtendente } = require("../middlewares/authMiddleware");
const { validarChamado } = require("../middlewares/validacoesChamado");
const tratarErrosValidacao = require("../middlewares/tratarErros");

const router = express.Router();

router.post("/", proteger, validarChamado, tratarErrosValidacao, criarChamado);
router.get("/", proteger, verificarAtendente, listarChamado);
router.get("/estatisticas", proteger, verificarAtendente, obterEstatisticas);
router.get("/meus", proteger, listarChamadosDoCliente)
router.delete("/meus/:id", proteger, excluirChamadoCliente)
router.get("/:id", proteger, obterChamado);
router.put("/:id/assumir", proteger, verificarAtendente, assumirChamado);
router.put("/:id/resolver", proteger, verificarAtendente, resolverChamado);


module.exports = router;