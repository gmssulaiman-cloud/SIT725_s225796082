const express = require('express');
const path = require('path');
const { divideNumbers } = require('./utils/calculator');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/calculate', (req, res) => {
  const first = Number(req.query.first);
  const second = Number(req.query.second);

  if (req.query.first === undefined || req.query.second === undefined) {
    return res.status(400).send('Missing required query parameters');
  }

  try {
    const result = divideNumbers(first, second);
    return res.status(200).send(`Result: ${result}`);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}