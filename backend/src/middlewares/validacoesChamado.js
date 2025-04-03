const { body } = require("express-validator");

const validarChamado = [
    body("titulo")
        .notEmpty().withMessage("O título é obrigatório")
        .isLength({ min: 5 }).withMessage("O título deve ter pelo menos 5 caracteres"),

    body("descricao")
        .notEmpty().withMessage("A descrição é obrigatória")
        .isLength({ min: 10 }).withMessage("A descrição deve ter pelo menos 10 caracteres"),
];

const validarAtualizacaoChamado = [
    body("status")
        .optional()
        .isIn(["aberto", "em andamento", "resolvido"])
        .withMessage("Status inválido. Use: aberto, em andamento ou resolvido"),
];

module.exports = { validarChamado, validarAtualizacaoChamado };