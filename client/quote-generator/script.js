const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loader
function startLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide loader
function stopLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
async function newQuote() {
  // may not see spinner because its loading from local quote - quickly
  startLoadingSpinner();

  setTimeout( async () => {
    try {
      // Picking a random quote from Api
      const apiData = await fetch('http://localhost:3000/quote/random');
      const quote = await apiData.json();
      authorText.textContent = quote.author;

      // Check quote length to determine style
      if (quote.quote.length > 70) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }
      // Setting quote, hiding loader
      quoteText.textContent = quote.quote;
    } catch (error) {
      console.log(error);
    }

    stopLoadingSpinner();
  }, 1300);
}

// Tweet
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
newQuote();
