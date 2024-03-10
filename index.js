// server.mjs

import express from 'express';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import cors from 'cors'; // Import cors module
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


app.post('/processDiagnosticReport', async (req, res) => {
    try {
        const texttojson = req.body.texttojson;
        let resuls=`define the and tell me the meaning ""${texttojson}"" `
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: texttojson }],
            model: 'gpt-3.5-turbo',
        });

        const responseData = chatCompletion.choices[0].message.content;
        console.log('Your JSON text:', responseData);
        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/',(req,res)=>{
    res.send('this working')
})
// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
