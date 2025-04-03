const express = require("express");
const {
    criarChamado,
    listarChamado,
    obterChamado,
    atualizarChamado,
    deletarChamado,
} = require("../controllers/chamadoController");

const { proteger, verificarAtendente } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", proteger, criarChamado);

router.get("/", proteger, verificarAtendente, listarChamado);

router.get("/:id", proteger, obterChamado);

router.put("/:id", proteger, verificarAtendente, atualizarChamado);

router.delete("/:id", proteger, verificarAtendente, deletarChamado);

module.exports = router;