import { useFavorites } from '../context/FavoritesContext';
import { type Movie } from '../types/api';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

type FavoriteButtonProps = {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
};

export const FavoriteButton = ({ movie, size = 'medium' }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(movie.imdbID);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Tooltip title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        onClick={handleClick}
        color={isFav ? 'error' : 'default'}
        size={size}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};
