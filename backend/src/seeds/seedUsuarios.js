require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");
const conectarDB = require("../config/db");

const seedUsuarios = async () => {
    await conectarDB();

    try {

        await Usuario.deleteMany();
        console.log("Todos os usuários antigos foram removidos.");

        const usuarios = await Usuario.insertMany([
            {
                nome: "Cliente 1",
                email: "cliente1@gmail.com",
                senha: "123456",
                role: "cliente",
            },
            {
                nome: "Atendente 1",
                email: "atendente1@gmail.com",
                senha: "123456",
                role: "atendente",
            },
        ]);

        console.log("Usuários criados com sucesso!");
        console.log(usuarios);
        process.exit();
    } catch (error) {
        console.error("Erro ao criar usuários: ", error);
        process.exit(1);
    }
};

seedUsuarios();