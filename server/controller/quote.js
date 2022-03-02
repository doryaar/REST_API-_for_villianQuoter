const Quote = require('../model/quote');

const getQuote = async (res, characterName) => {
  try {
    const randomQuote = await Quote.getRandom(characterName);
    const quote = randomQuote.rows[0].content;
    const author = randomQuote.rows[0].character_name; 
    res.status(200).json({
      quote: quote,
      author: author,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getRandomQuote = async (req, res, next) => {
  getQuote(res);
};

exports.getRandomQuoteByCharacter = async (req, res, next) => {
  const characterName = req.params.name;
  getQuote(res, characterName);
};
