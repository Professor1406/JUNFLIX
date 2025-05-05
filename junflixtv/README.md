# JUNFLIXTV - Streaming Website

A Netflix-like streaming website that provides access to movies, TV shows, anime, Pinoy movies, and Korean dramas.

## Features

- Modern Netflix-like UI
- Multiple streaming sources for each content type
- Responsive design
- Trending content from TMDB
- Detailed media information
- Smooth video playback

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/junflixtv.git
cd junflixtv
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your API keys:
```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_IMDB_API_KEY=your_imdb_api_key
NEXT_PUBLIC_TRAKT_API_KEY=your_trakt_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Project Structure

- `/src/components` - Reusable React components
- `/src/pages` - Next.js pages
- `/src/services` - API and streaming services
- `/src/styles` - Global styles
- `/public` - Static assets

## Streaming Sources

### Movies
1. VidSrc Pro (Low ads)
2. 2embed.to (Medium ads)
3. Sflix (High ads)
4. Movie-web.app (Medium ads)

### TV Shows
1. VidSrc Pro (Low ads)
2. 2embed.to (Medium ads)
3. Sflix (High ads)
4. Movie-web.app (Medium ads)

### Anime
1. Consumet API (Low ads)
2. Enime.moe (Low ads)
3. Zoro.to (Medium ads)
4. Gogoanime (High ads)

### Pinoy Movies
1. Pinoyflix API (Low ads)
2. CinePinoy (Medium ads)
3. Tambayan Replay (High ads)

### Korean Drama
1. DramaCool (Low ads)
2. DramaNice (Medium ads)
3. Loklok API (Low ads)
4. MyAsianTV (High ads)

## License

MIT License
