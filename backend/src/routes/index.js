const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Rotas da API funcionando.");
});

module.exports = router;