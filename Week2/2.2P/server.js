const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store quotes
let quotes = [
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking."
];

// GET endpoint to retrieve a random quote
app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

// Task 2.2P: /add endpoint
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.send("Error: Please provide valid numbers for 'a' and 'b'.");
  }

  const sum = a + b;
  res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// START THE SERVER (this was missing!)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
