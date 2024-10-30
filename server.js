

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyCsLzQGsphyT3BnYxEVZ0_8nqYgQVkXOm0");

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// async function run() {
//     const prompt = "Write a story about an AI and magic"
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }
  
//   run();

const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI('AIzaSyAso0f_KZEEoLZl2zTzwy3uKhniumT56YY');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle chat messages
app.post('/api/message', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        res.json({ response: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
