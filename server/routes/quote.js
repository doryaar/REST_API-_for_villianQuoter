const express = require('express');

const router = express.Router();

const quoteController = require('../controller/quote');

router.get('/random', quoteController.getRandomQuote);

router.get('/:name', quoteController.getRandomQuoteByCharacter);

module.exports = router;
