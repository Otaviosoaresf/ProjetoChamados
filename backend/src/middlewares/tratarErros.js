const { validationResult } = require("express-validator");

const tratarErrosValidacao = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        const mensagens = erros.array().map((erro) => ({
            campo: erro.param,
            mensagem: erro.msg
        }));

        return res.status(400).json({
            sucesso: false,
            erros: mensagens
        });
    }
    next();
};

module.exports = tratarErrosValidacao;