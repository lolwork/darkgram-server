const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const users = {};
const messages = [];

app.post('/api/send_code', (req, res) => {
    const { phone } = req.body;
    res.json({ success: true, message: "Код отправлен. Введите 22222" });
});

app.post('/api/verify', (req, res) => {
    const { phone, code } = req.body;
    if (code === "22222") {
        users[phone] = { phone, token: "token_" + Date.now() };
        res.json({ success: true, token: users[phone].token });
    } else {
        res.status(400).json({ success: false, message: "Неверный код! Введите 22222" });
    }
});

app.get('/api/messages', (req, res) => res.json(messages));

app.post('/api/send_message', (req, res) => {
    const { phone, text } = req.body;
    if (!text) return res.status(400).json({ error: "Пустое сообщение" });
    const msg = { phone: phone || "Аноним", text, time: new Date().toLocaleTimeString() };
    messages.push(msg);
    res.json({ success: true, msg });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DARKGRAM server running on ${PORT}`));
