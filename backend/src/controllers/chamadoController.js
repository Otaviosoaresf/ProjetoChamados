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

const assumirChamado = async (req, res) => {
    try {
        const chamado = await Chamado.findById(req.params.id);

        if (!chamado) {
            return res.status(404).json({ msg: "Chamado não encontrado" })
        }

        if (chamado.status !== "aberto") {
            return res.status(400).json({ msg: "Chamado não está disponível para ser assumido."})
        }

        chamado.atendente = req.usuario.id;
        chamado.status = "em andamento";
        chamado.dataAssumido = new Date()
        await chamado.save();

        res.status(200).json({ msg: "Chamado assumido com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao assumir chamado.", error})
    }
};

const resolverChamado = async (req, res) => {
    try {
        const chamado = await Chamado.findById(req.params.id);

        if (!chamado) {
            return res.status(404).json({ msg: "Chamado não encontrado" });
        }

        if (chamado.status !== "em andamento") {
            return res.status(400).json({ msg: "Chamado não está em andamento." })
        }

        if (chamado.atendente.toString() !== req.usuario.id) {
            return res.status(403).json({ msg: "Você não pode resolver este chamado." })
        }

        chamado.status = "resolvido";
        chamado.dataResolvido = new Date();
        await chamado.save();

        res.status(200).json({ msg: "Chamado resolvido com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao resolver chamado.", error})
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

const excluirChamadoCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const chamado = await Chamado.findById(id);

        if (!chamado) {
            return res.status(404).json({ msg: "Chamado não encontrado" });
        }

        if (chamado.cliente.toString() !== req.usuario.id) {
            return res.status(403).json({ msg: "Acesso negado. Apenas o criador do chamado pode excluí-lo."})
        }

        if (chamado.status !== "aberto") {
            return res.status(400).json({ msg: "Só é possível excluir chamados em aberto."})
        }

        await chamado.deleteOne();

        res.status(200).json({ msg: "Chamado excluído com sucesso."});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao excluir chamado.", error})
    }
}

const obterEstatisticas = async (req, res) => {
    try {
        const total = await Chamado.countDocuments();
        const abertos = await Chamado.countDocuments({ status: "aberto" });
        const andamento = await Chamado.countDocuments({ status: "em andamento" });
        const resolvidos = await Chamado.countDocuments({ status: "resolvido" });
    
        res.status(200).json({
            total,
            abertos,
            andamento,
            resolvidos,
        })
        
    } catch (error) {
        res.status(500).json({ msg: "Erro ao obter estatísticas", error})
    }
};

module.exports = {
    criarChamado,
    listarChamado,
    obterChamado,
    assumirChamado,
    resolverChamado,
    excluirChamadoCliente,
    listarChamadosDoCliente,
    obterEstatisticas
};