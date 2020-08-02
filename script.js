const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  // setup a proxy URL to avoid a CORS error
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL = 'http://api.forismatic.com/api/1.0/';
  const apiMethod = `${apiURL}?method=getQuote&lang=en&format=json`;
  try {
    const response = await fetch(proxyURL + apiMethod);
    const data = await response.json();
    // If Author is blank, add author 'Unknown'
    if (data.authorText === '') authorText.innerText = 'Unknown';
    else authorText.innerText = data.quoteAuthor;
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');
    quoteText.innerText = data.quoteText;
    hideLoadingSpinner();
  } catch (error) {
    getQuote(); // in case of an error - call again
  }
}

// Tweet Quote with a Tweet Web Intent
function tweetQuote() {
  const twitterURL = 'https://twitter.com/intent/tweet';
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweetWebIntent = `${twitterURL}?text=${quote} - ${author}`;
  window.open(tweetWebIntent, '_blank');  
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuote();
