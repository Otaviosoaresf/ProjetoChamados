const mongoose = require("mongoose");

const ChamadoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["aberto", "em andamento", "resolvido"],
        default: "aberto",
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    atendente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        default: null,
    }
}, { timestamps: true });

module.exports = mongoose.model("Chamado", ChamadoSchema);