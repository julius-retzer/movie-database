import { useFavorites } from '../hooks/useFavorites';
import { type Movie } from '../../../types/api';
import { IconButton, Tooltip } from '@mui/material';
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';

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
        color={isFav ? 'warning' : 'default'}
        size={size}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};
