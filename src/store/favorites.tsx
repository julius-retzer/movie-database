import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MovieSearchResult } from '@/types/api';

interface FavoritesContextType {
  favorites: MovieSearchResult[];
  addFavorite: (movie: MovieSearchResult) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'movieAppFavorites';

const getStoredFavorites = (): MovieSearchResult[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage', error);
    return [];
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<MovieSearchResult[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setFavorites(getStoredFavorites());
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  }, [favorites]);

  const addFavorite = (movie: MovieSearchResult) => {
    setFavorites((prev) => {
      // Prevent duplicates
      if (prev.some((fav) => fav.imdbID === movie.imdbID)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some((movie) => movie.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
