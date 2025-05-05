const STREAMING_SOURCES = {
  movies: [
    {
      name: 'VidSrc Pro',
      url: 'https://vidsrc.to/embed/movie/',
      priority: 1,
      ads: 'low'
    },
    {
      name: '2embed.to',
      url: 'https://www.2embed.to/embed/tmdb/movie?id=',
      priority: 2,
      ads: 'medium'
    },
    {
      name: 'Sflix',
      url: 'https://sflix.to/movie/',
      priority: 3,
      ads: 'high'
    },
    {
      name: 'Movie-web',
      url: 'https://movie-web.app/movie/',
      priority: 4,
      ads: 'medium'
    }
  ],
  tvShows: [
    {
      name: 'VidSrc Pro',
      url: 'https://vidsrc.to/embed/tv/',
      priority: 1,
      ads: 'low'
    },
    {
      name: '2embed.to',
      url: 'https://www.2embed.to/embed/tmdb/tv?id=',
      priority: 2,
      ads: 'medium'
    },
    {
      name: 'Sflix',
      url: 'https://sflix.to/tv/',
      priority: 3,
      ads: 'high'
    },
    {
      name: 'Movie-web',
      url: 'https://movie-web.app/tv/',
      priority: 4,
      ads: 'medium'
    }
  ],
  anime: [
    {
      name: 'Consumet API',
      url: 'https://api.consumet.org/anime/',
      priority: 1,
      ads: 'low'
    },
    {
      name: 'Enime.moe',
      url: 'https://api.enime.moe/',
      priority: 2,
      ads: 'low'
    },
    {
      name: 'Zoro.to',
      url: 'https://api.consumet.org/anime/zoro/',
      priority: 3,
      ads: 'medium'
    },
    {
      name: 'Gogoanime',
      url: 'https://api.consumet.org/anime/gogoanime/',
      priority: 4,
      ads: 'high'
    }
  ],
  pinoyMovies: [
    {
      name: 'Pinoyflix API',
      url: 'https://pinoyflix-api.herokuapp.com/',
      priority: 1,
      ads: 'low'
    },
    {
      name: 'CinePinoy',
      url: 'https://cinepinoy.com/',
      priority: 2,
      ads: 'medium'
    },
    {
      name: 'Tambayan Replay',
      url: 'https://tambayanreplay.com/',
      priority: 3,
      ads: 'high'
    }
  ],
  koreanDrama: [
    {
      name: 'DramaCool',
      url: 'https://dramacool.com/',
      priority: 1,
      ads: 'low'
    },
    {
      name: 'DramaNice',
      url: 'https://dramanice.com/',
      priority: 2,
      ads: 'medium'
    },
    {
      name: 'Loklok API',
      url: 'https://api.loklok.tv/',
      priority: 3,
      ads: 'low'
    },
    {
      name: 'MyAsianTV',
      url: 'https://myasiantv.com/',
      priority: 4,
      ads: 'high'
    }
  ]
};

export const getStreamingSources = (type) => {
  return STREAMING_SOURCES[type] || [];
};

export const getBestStreamingSource = (type) => {
  const sources = getStreamingSources(type);
  return sources.sort((a, b) => a.priority - b.priority)[0];
}; 