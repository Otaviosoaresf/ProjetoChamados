const Chamado = require("../models/Chamado");

const criarChamado = async (req, res) => {
    try {
        const { titulo, descricao } = req.body;

        const novoChamado = await Chamado.create({
            titulo,
            descricao,
            cliente: req.usuario._id
        });

        res.status(201).json({ msg: "Chamado criado com sucesso", chamado: novoChamado });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao criar chamado", error });
    }
};

const listarChamado = async (req, res) => {
    try {

        const { status, cliente, atendente, titulo, page = 1, limit = 10 } = req.query;

        const filtros = {};
        if (status) filtros.status = status;
        if (cliente) filtros.cliente = cliente;
        if (atendente) filtros.atendente = atendente;
        if (titulo) filtros.titulo = { $regex: titulo, $options: "i"}

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [chamados, total] = await Promise.all([
            Chamado.find(filtros)
                .skip(skip)
                .limit(parseInt(limit))
                .populate("cliente", "nome email")
                .populate("atendente", "nome email"),
            Chamado.countDocuments(filtros)
        ]);
            

        res.status(200).json(chamados);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao listar chamados", error });
    }
};

const obterChamado = async (req, res) => {
    try {
        const chamado = await Chamado.findById(req.params.id)
            .populate("cliente", "nome email")
            .populate("atendente", "nome email")

        if (!chamado) return res.status(404).json({ msg: "Chamado não encontrado" });

        res.status(200).json(chamado);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar chamado", error });
    }
};

const atualizarChamado = async (req, res) => {
    try {
        const chamado = await Chamado.findById(req.params.id);

        if (!chamado) return res.status(404).json({ msg: "Chamado não encontrado" });

        if (chamado.atendente && chamado.atendente.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ msg: "Este chamado já foi atribuído a outro atendente." });
        }

        chamado.status = req.body.status || chamado.status;
        
         if (!chamado.atendente) {
            chamado.atendente = req.usuario._id;
         }

        await chamado.save();

        res.status(200).json({ msg: "Chamado atualizado com sucesso", chamado });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar chamado", error })
    }
};

const deletarChamado = async (req, res) => {
    try {
        const chamado = await Chamado.findById(req.params.id);
        if (!chamado) return res.status(404).json({ msg: "Chamado não encontrado" })

        await chamado.deleteOne();
        res.json({ msg: "Chamado removido com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar chamado", error });
    }
};

const listarChamadosDoCliente = async (req, res) => {
    try {
        const { status } = req.query;

        const filtros = { cliente: req.usuario.id };

        if (status) {
            filtros.status = status;
        }

        const chamados = await Chamado.find(filtros)
            .populate("cliente", "nome email")
            .populate("atendente", "nome email")
            .sort({ createdAt: -1 });
        
        res.status(200).json(chamados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao listar chamados do cliente: ", error })
    }
};

const obterEstatisticas = async (req, res) => {
    try {
        const total = await Chamado.countDocuments();

        const porStatus = await Chamado.aggregate([
            {
                $group: {
                    _id: "$status",
                    quantidade: { $sum: 1 }
                }
            }
        ]);

        const porCliente = await Chamado.aggregate([
            {
                $group: {
                    _id: "$cliente",
                    quantidade: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "_id",
                    foreignField: "_id",
                    as: "cliente"
                }
            },
            {
                $unwind: "$cliente"
            },
            {
                $project: {
                    _id: 0,
                    nome: "$cliente.nome",
                    email: "$cliente.email",
                    quantidade: 1
                }
            }
        ]);

        res.status(200).json({
            totalChamados: total,
            porStatus,
            porCliente
         });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao obter estatísticas", error})
    }
}

module.exports = {
    criarChamado,
    listarChamado,
    obterChamado,
    atualizarChamado,
    deletarChamado,
    listarChamadosDoCliente,
    obterEstatisticas
};