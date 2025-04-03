require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const conectarDB = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");
const chamadoRoutes = require("./routes/chamadoRoutes");

const app = express();

conectarDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/chamados", chamadoRoutes);

app.get("/", (req, res) => {
    res.send("API de Chamados Rodando");
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});