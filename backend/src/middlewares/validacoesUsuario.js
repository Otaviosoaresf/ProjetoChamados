const { body } = require("express-validator");

const validarRegistro = [
    body("nome")
        .notEmpty().withMessage("O nome é obrigatório")
        .isLength({ min: 3 }).withMessage("O nome deve ter pelo menos 3 caracteres"),

    body("email")
        .notEmpty().withMessage("O e-mail é obrigatório")
        .isEmail().withMessage("E-mail inválido"),

    body("senha")
        .notEmpty().withMessage("A senha é obrigatória")
        .isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),

    body("role")
        .optional()
        .isIn(["cliente", "atendente"])
        .withMessage("Role inválido. Use: cliente ou atendente"),
];

const validarLogin = [
    body("email")
        .notEmpty().withMessage("O e-mail é obrigatório")
        .isEmail().withMessage("E-mail inválido"),

    body("senha")
        .notEmpty().withMessage("A senha é obrigatória")
        .isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
];

module.exports = { validarRegistro, validarLogin };