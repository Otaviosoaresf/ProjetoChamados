require("dotenv").config();
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Chamado = require("../models/Chamado");

const gerarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "7d"});
};

const registraUsuario = async (req, res) => {
    const { nome, email, senha, role } = req.body;

    try {

        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ msg: "Usuário já existe" });
        }

       const novoUsuario = await Usuario.create({ nome, email, senha, role });

       res.status(201).json({
        _id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
        token: gerarToken(novoUsuario._id),
       });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao registrar usuário", error})
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        console.log("Usuário logado:", usuario);

        if (usuario && (await usuario.compararSenha(senha))) {
            res.json({
                _id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role,
                token: gerarToken(usuario._id)
            });
        } else {
            res.status(401).json({ msg: "Credenciais inválidas" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro ao realizar login", error })
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select("-senha");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuários", error})
    }
};

const buscarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select("-senha");
        if (!usuario) return res.status(404).json({ msg: "Usuários não encontrado" });

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar usuário", error });
    }
};

const atualizarUsuario = async (req, res) => {
    try {
        const { nome, email, role } = req.body;
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) return res.status(404).json({ msg: "Usuário não encontrado" });

        usuario.nome = nome || usuario.nome;
        usuario.email = email || usuario.email;
        usuario.role = role || usuario.role;

        await usuario.save();
        res.json({ msg: "Usuário atualizado com sucesso", usuario});
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar usuário", error });
    }
}

const atualizarPerfil = async (req, res) => {
    try {
        const { nome, email, senha} = req.body;

        const atualizacoes = { nome, email };

        if (senha) {
            const salt = await bcrypt.genSalt(10);
            atualizacoes.senha = await bcrypt.hash(senha, salt);
        }

        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.usuario.id, atualizacoes, { new: true });

        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Erro ao atualizar perfil", error });
    }
};

const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        if (usuario.role === "cliente") {
            await Chamado.deleteMany({
                cliente: id,
                status: { $in: ["aberto", "em andamento"] },
            });
        }

        if (usuario.role === "atendente") {
            await Chamado.updateMany(
                { atendente: id, status: "em andamento" },
                {
                    $set: {
                        atendente: null,
                        status: "aberto",
                    },
                }
            );
        }

        await Usuario.findByIdAndDelete(id)

        res.status(200).json({ msg: "Usuário excluído e chamados relacionados atualizados com sucesso." });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao excluir usuário: ", error })
    }
};

module.exports = {
    registraUsuario,
    loginUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    atualizarPerfil,
    deletarUsuario,
}

