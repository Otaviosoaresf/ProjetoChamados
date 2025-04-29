const { body } = require("express-validator");

const validarChamado = [
    body("titulo")
        .notEmpty().withMessage("O título é obrigatório")
        .isLength({ min: 5 }).withMessage("O título deve ter pelo menos 5 caracteres"),

    body("descricao")
        .notEmpty().withMessage("A descrição é obrigatória")
        .isLength({ min: 10 }).withMessage("A descrição deve ter pelo menos 10 caracteres"),
];


module.exports = { validarChamado };