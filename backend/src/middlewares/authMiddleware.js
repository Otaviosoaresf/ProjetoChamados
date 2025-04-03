const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const proteger = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decodificado = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decodificado:", decodificado);
            req.usuario = await Usuario.findById(decodificado.id).select("-senha");
            console.log("Usuário______:", req.usuario);
            next();
        } catch (error) {
            res.status(401).json({ msg: "Token inválido, acesso negado" });
        }
    } else {
        res.status(401).json({ msg: "Sem token, acesso negado" })
    }
};

const verificarAtendente = (req, res, next) => {
    console.log("Usuário autenticado:", req.usuario);

    if (req.usuario && req.usuario.role === "atendente") {
        next();
    } else {
        res.status(403).json({ msg: "Acesso negado. Apenas atendentes podem acessar esta rota." })
    }
};

module.exports = { proteger, verificarAtendente };