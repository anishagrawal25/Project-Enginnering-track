const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// Chat route
app.post('/chat', async (req, res) => {
    // TODO: Implement the AI chat route
    // 1. Extract `messages` from req.body
    // 2. Read API key from process.env.OPENROUTER_API_KEY
    // 3. POST to https://openrouter.ai/api/v1/chat/completions
    //    with Authorization: Bearer <key> and the messages array
    // 4. Return the AI reply as { reply: "..." }

    console.log('Chat request received. Waiting for student implementation...');
    res.status(501).json({ error: "Not Implemented. Add your OpenRouter logic in backend/server.js" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
