chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        fetch('https://api.quotable.io/quotes?limit=100')
            .then(response => response.json())
            .then(data => {
                // Check if data is not empty and contains quotes
                if (data && data.results && data.results.length > 0) {
                    // Choose a random quote from the response
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    const randomQuote = data.results[randomIndex].content;
                    
                    // Display the random quote
                    const quoteElement = document.getElementById('quote');
                    quoteElement.textContent = randomQuote;
                } else {
                    console.error('No quotes found in the response.');
                }
            })
            .catch(error => {
                console.error('Error fetching quotes:', error);
            });
    }
});
