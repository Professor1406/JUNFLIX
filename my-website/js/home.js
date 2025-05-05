const API_KEY = '648c004c97b5a1425c702528ab88ddac';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';
let currentItem;

// Function to fetch trending content for movies, TV shows, and anime
async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Function to fetch trending anime using `tv` with a filter for anime genres
async function fetchTrendingAnime() {
  let allResults = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const filtered = data.results.filter(item =>
      item.original_language === 'ja' && item.genre_ids.includes(16)
    );
    allResults = allResults.concat(filtered);
  }

  return allResults;
}

// Function to fetch Korean dramas (using a `genre_ids` filter for Korean)
async function fetchTrendingKoreanDramas() {
  let allResults = [];

  for (let page = 1; page <= 3; page++) {
    const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    const filtered = data.results.filter(item =>
      item.original_language === 'ko' && item.genre_ids.includes(18) // Korean dramas
    );
    allResults = allResults.concat(filtered);
  }

  return allResults;
}

// Display banner based on the trending item
function displayBanner(item) {
  document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
}

// Display the list of movies, TV shows, anime, and Korean dramas
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

// Show details for a selected item
function showDetails(item) {
  currentItem = item;
  document.getElementById('modal-title').textContent = item.title || item.name;
  document.getElementById('modal-description').textContent = item.overview;
  document.getElementById('modal-image').src = `${IMG_URL}${item.poster_path}`;
  document.getElementById('modal-rating').innerHTML = '★'.repeat(Math.round(item.vote_average / 2));
  document.getElementById('modal').style.display = 'flex';

  fetchExtraDetails(item.id); // <- this was missing

  function fetchExtraDetails(tmdbId) {
    const tmdbType = item.media_type || (item.title ? 'movie' : 'tv');
    fetch(`${BASE_URL}/${tmdbType}/${tmdbId}?api_key=${API_KEY}&append_to_response=external_ids`)
      .then(res => res.json())
      .then(tmdbData => {
        const imdbID = tmdbData.imdb_id;
        if (imdbID) {
          fetchIMDbDetails(imdbID);
          fetchTraktDetails(imdbID);
        }
      });
  }
}
// Change server based on the user selection
function changeServer() {
  const server = document.getElementById('server').value;
  const type = currentItem.media_type === "movie" ? "movie" : "tv";
  let embedURL = "";

  if (server === "vidsrc.cc") {
    embedURL = `https://vidsrc.cc/v2/embed/${type}/${currentItem.id}`;
  } else if (server === "vidsrc.me") {
    embedURL = `https://vidsrc.net/embed/${type}/?tmdb=${currentItem.id}`;
  } else if (server === "player.videasy.net") {
    embedURL = `https://player.videasy.net/${type}/${currentItem.id}`;
  } else if (server === "hdvb") {
    embedURL = `https://multiembed.mov/directstream.php?video_id=${currentItem.id}&tmdb=1`; // HDVB style URL
  }

  document.getElementById('modal-video').src = embedURL;
}

// Close the modal when done viewing
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

// Search through TMDB API
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

// Initialize the app by fetching trending data
async function init() {
  const movies = await fetchTrending('movie');
  const tvShows = await fetchTrending('tv');
  const anime = await fetchTrendingAnime();
  const koreanDramas = await fetchTrendingKoreanDramas();

  displayBanner(movies[Math.floor(Math.random() * movies.length)]);
  displayList(movies, 'movies-list');
  displayList(tvShows, 'tvshows-list');
  displayList(anime, 'anime-list');
  displayList(koreanDramas, 'korean-dramas-list');
}

init();
