import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import Image from 'next/image';

type MoviePosterProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sx?: object;
};

export const MoviePoster = ({
  src,
  alt,
  width = 200,
  height = 300,
  sx = {},
}: MoviePosterProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback image URL (you can replace this with your own fallback image)
  const fallbackImage = 'https://placehold.co/200x300?text=No+Poster&font=roboto';

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius: 1,
        bgcolor: 'grey.200',
        ...sx,
      }}
    >
      {!imageLoaded && !imageError && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          animation="wave"
        />
      )}
      <img
        src={imageError ? fallbackImage : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          display: imageLoaded ? 'block' : 'none',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        loading="lazy"
      />
    </Box>
  );
};
