import { useState } from 'react';
import { CardMedia } from '@mui/material';
import type { Movie } from '../../types/api';

type MoviePosterProps = {
  movie: Pick<Movie, 'Poster' | 'Title'>;
  height?: number | string;
};

const FALLBACK_IMAGE = 'https://placehold.co/200x300?text=No+Poster&font=roboto';

export const MoviePoster = ({ movie, height = 400 }: MoviePosterProps) => {
  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_IMAGE
  );

  const handleError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <CardMedia
      component="img"
      height={height}
      image={imgSrc}
      alt={`${movie.Title} poster`}
      onError={handleError}
      sx={{ objectFit: 'contain' }}
    />
  );
};
