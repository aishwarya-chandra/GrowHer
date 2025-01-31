const apiKey = '6906351a1c604e3ab5a28639481299d7'; // Replace with your NewsAPI key

// Event listener for News navbar link to load news when clicked
document.getElementById('news-nav').addEventListener('click', () => {
    loadNews(); // Call loadNews() when the News link is clicked
});

// Function to load general news (trending news) by default
function loadNews() {
    fetchNews('general'); // Fetch general industry (trending) news by default
}

// Function to fetch news articles from NewsAPI
async function fetchNews(industry = 'general') {
    let url;
        // Fetch news based on the selected industry
        url = `https://newsapi.org/v2/top-headlines?category=${industry}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            console.error('Error fetching news:', data.message);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Function to display news articles dynamically
function displayNews(articles) {
    const newsContainer = document.getElementById('news-articles');
    newsContainer.innerHTML = ''; // Clear previous articles

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<p>No trending articles available right now.</p>';
        return;
    }

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');
        
        // Set up the content of each article
        articleDiv.innerHTML = `
            <h4>${article.title}</h4>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        
        newsContainer.appendChild(articleDiv);
    });
}

// Event listener for industry filter
document.getElementById('industry-select').addEventListener('change', (e) => {
    const selectedIndustry = e.target.value;
    fetchNews(selectedIndustry);
});

loadNews();

