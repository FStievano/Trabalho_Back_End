const express = require('express');
const bankService = require('./bankService');
const app = express();

app.use(express.json());

app.post('/transfer', (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        
        if (senderId == null || receiverId == null || amount == null) {
            return res.status(400).json({ error: "Dados incompletos" });
        }

        const result = bankService.transfer(senderId, receiverId, amount);
        return res.status(200).json(result);

    } catch (error) {
        if (
            error.message === "Usuário não encontrado" ||
            error.message === "Saldo insuficiente" ||
            error.message === "Valor inválido"
        ) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro interno" });
    }
});

module.exports = app;
