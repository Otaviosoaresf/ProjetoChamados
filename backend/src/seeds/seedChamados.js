require("dotenv").config();
const mongoose = require("mongoose");
const Chamado = require("../models/Chamado");
const Usuario = require("../models/Usuario");
const conectarDB = require("../config/db");

const seedChamados = async () => {
    await conectarDB();

    try {
        await Chamado.deleteMany();
        console.log("Todos os chamados antigos foram removidos.");

        const cliente = await Usuario.findOne({ role: "cliente" });
        const atendente = await Usuario.findOne({ role: "atendente" });

        if (!cliente || !atendente) {
            console.error("Não foi possível encontrar usuários para criar chamados.");
            process.exit(1);
        }

        const chamados = await Chamado.insertMany([
            {
                titulo: "Problema no sistema",
                descricao: "O sistema está lento e travando frequentemente.",
                status: "aberto",
                cliente: cliente._id,
                atendente: atendente._id,
            },
            {
                titulo: "Erro ao acessar conta",
                descricao: "Não consigo redefinir minha senha, aparece um erro.",
                status: "em andamento",
                cliente: cliente._id,
                atendente: atendente._id,
            },
        ]);

        console.log("Chamados criados com sucesso!");
        console.log(chamados);
        process.exit();
    } catch (error) {
        console.error("Erro ao criar chamados", error);
        process.exit(1)
    }
};

seedChamados();