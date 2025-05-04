const API_KEY = '648c004c97b5a1425c702528ab88ddac';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';
let currentItem;

// Streaming API URLs
const STREAMING_SERVERS = {
    'vidsrc.cc': 'https://vidsrc.cc/v2/embed/',
    'vidsrc.me': 'https://vidsrc.net/embed/',
    'player.videasy.net': 'https://player.videasy.net/',
    'streamtape': 'https://streamtape.com/e/',
    'vidcloud': 'https://vidcloud.icu/embed-',
};

// Fetch trending movies, TV shows, anime, and Kdramas
async function fetchTrending(type) {
    const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

async function fetchTrendingAnime() {
    let allResults = [];
    for (let page = 1; page <= 3; page++) {
        const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
        const data = await res.json();
        const filtered = data.results.filter(item =>
            item.original_language === 'ja' && item.genre_ids.includes(16) // Filter for Anime
        );
        allResults = allResults.concat(filtered);
    }
    return allResults;
}

async function fetchTrendingKdramas() {
    const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
    const data = await res.json();
    const kdramas = data.results.filter(item => item.origin_country.includes("KR"));
    return kdramas;
}

// Display the content's banner
function displayBanner(item) {
    document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
    document.getElementById('banner-title').textContent = item.title || item.name;
}

// Display the content lists (Movies, TV Shows, Anime, Kdramas)
function displayList(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => {
        const img = document.createElement('img');
        img.src = `${IMG_URL}${item.poster_path}`;
        img.alt = item.title || item.name;
        img.onclick = () => showDetails(item);
        container.appendChild(img);
    });
}

// Show detailed view of the selected content
function showDetails(item) {
    currentItem = item;
    document.getElementById('modal-title').textContent = item.title || item.name;
    document.getElementById('modal-description').textContent = item.overview;
    document.getElementById('modal-image').src = `${IMG_URL}${item.poster_path}`;
    document.getElementById('modal-rating').innerHTML = '★'.repeat(Math.round(item.vote_average / 2));
    changeServer();
    document.getElementById('modal').style.display = 'flex';
}

// Handle server switching and embedding the video
function changeServer() {
    const server = document.getElementById('server').value;
    const type = currentItem.media_type === "movie" ? "movie" : "tv";
    let embedURL = STREAMING_SERVERS[server] + `${currentItem.id}`;

    // If the selected server is unavailable or invalid, fall back to another server
    if (!embedURL || !STREAMING_SERVERS[server]) {
        alert('Selected server is not available or invalid, trying fallback...');
        const fallbackServer = Object.values(STREAMING_SERVERS)[0]; // Use the first available server as fallback
        embedURL = fallbackServer + `${currentItem.id}`;
    }

    document.getElementById('modal-video').src = embedURL;
}

// Close the modal and stop the video
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-video').src = '';
}

// Open the search modal
function openSearchModal() {
    document.getElementById('search-modal').style.display = 'flex';
    document.getElementById('search-input').focus();
}

// Close the search modal
function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
    document.getElementById('search-results').innerHTML = '';
}

// Search for content across Movies, TV Shows, and Anime
async function searchTMDB() {
    const query = document.getElementById('search-input').value;
    if (!query.trim()) {
        document.getElementById('search-results').innerHTML = '';
        return;
    }

    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();

    const container = document.getElementById('search-results');
    container.innerHTML = '';
    data.results.forEach(item => {
        if (!item.poster_path) return;
        const img = document.createElement('img');
        img.src = `${IMG_URL}${item.poster_path}`;
        img.alt = item.title || item.name;
        img.onclick = () => {
            closeSearchModal();
            showDetails(item);
        };
        container.appendChild(img);
    });
}

// Initialize content and load data
async function init() {
    const movies = await fetchTrending('movie');
    const tvShows = await fetchTrending('tv');
    const anime = await fetchTrendingAnime();
    const kdramas = await fetchTrendingKdramas();

    displayBanner(movies[Math.floor(Math.random() * movies.length)]);
    displayList(movies, 'movies-list');
    displayList(tvShows, 'tvshows-list');
    displayList(anime, 'anime-list');
    displayList(kdramas, 'kdramas-list');
}

// Run the initialization
init();
