import { createContext, type ReactNode, useState, useCallback, useEffect } from 'react';
import type { Movie } from '../../../types/api';

type FavoritesContextType = {
  favorites: Movie[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'movie-app-favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    // Load favorites from localStorage on initial render
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((movie) => movie.imdbID === id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      setFavorites((prev) => {
        if (isFavorite(movie.imdbID)) {
          return prev.filter((m) => m.imdbID !== movie.imdbID);
        }
        return [...prev, movie];
      });
    },
    [isFavorite]
  );

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

