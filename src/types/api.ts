export interface Movie {
  /** A valid IMDb ID (e.g., tt1285016) */
  imdbID: string;
  /** Movie title */
  Title: string;
  /** Release year */
  Year: string;
  /** Type of the result (movie, series, episode) */
  Type: string;
  /** URL of the movie poster */
  Poster: string;
}

export interface MovieDetail extends Movie {
  /** Movie rating (e.g., "PG-13") */
  Rated: string;
  /** Release date (e.g., "22 Jun 2017") */
  Released: string;
  /** Movie runtime (e.g., "128 min") */
  Runtime: string;
  /** Genre (e.g., "Drama, Romance") */
  Genre: string;
  /** Director(s) */
  Director: string;
  /** Writer(s) */
  Writer: string;
  /** Main actors */
  Actors: string;
  /** Plot summary */
  Plot: string;
  /** Language(s) */
  Language: string;
  /** Country of origin */
  Country: string;
  /** Awards won */
  Awards: string;
  /** Ratings from various sources */
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  /** Metascore */
  Metascore: string;
  /** IMDb rating */
  imdbRating: string;
  /** Number of IMDb votes */
  imdbVotes: string;
  /** DVD release date */
  DVD?: string;
  /** Box office earnings */
  BoxOffice?: string;
  /** Production company */
  Production?: string;
  /** Movie website */
  Website?: string;
  /** Response status ("True" or "False") */
  Response: 'True' | 'False';
}

export interface MovieSearchResponse {
  /** Search results */
  Search: Movie[];
  /** Total number of results */
  totalResults: string;
  /** Response status ("True" or "False") */
  Response: 'True' | 'False';
  /** Error message if Response is "False" */
  Error?: string;
}

export interface MovieDetailResponse extends MovieDetail {
  /** Response status ("True" or "False") */
  Response: 'True' | 'False';
  /** Error message if Response is "False" */
  Error?: string;
}

export interface ApiError extends Error {
  /** Response status (always "False" for errors) */
  Response: 'False';
  /** Error message */
  Error: string;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'Response' in error &&
    (error as { Response: string }).Response === 'False' &&
    'Error' in error
  );
}

export type SearchParams = {
  /** Search query */
  q: string;
  /** Page number (1-based) */
  page?: number;
  /** Release year */
  y?: string;
  /** Type of result (movie, series, episode) */
  type?: 'movie' | 'series' | 'episode';
};

export type MovieParams = {
  /** A valid IMDb ID (e.g., tt1285016) */
  i: string;
  /** Return short or full plot (default: short) */
  plot?: 'short' | 'full';
  /** The data type to return (default: json) */
  r?: 'json' | 'xml';
  /** API version (reserved for future use) */
  v?: number;
};
