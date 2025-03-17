require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const conectarDB = require("./config/db");
const routes = require("./routes/index");

const app = express();

conectarDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("API de Chamados Rodando");
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});