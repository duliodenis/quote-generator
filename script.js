// Get Quote from API
async function getQuote() {
  // setup a proxy URL to avoid a CORS error
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiURL = 'http://api.forismatic.com/api/1.0/';
  const apiMethod = `${apiURL}?method=getQuote&lang=en&format=json`;
  try {
    const response = await fetch(proxyURL + apiMethod);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    getQuote(); // in case of an error - call again
    console.log('Quote Error: ', error);
  }
}

// On Load
getQuote();