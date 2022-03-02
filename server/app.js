const express = require('express');

const dbClient = require('./util/database');

const quoteRoutes = require('./routes/quote');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/quote', quoteRoutes);

(async () => {
  try {
    await dbClient.connect();
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();
