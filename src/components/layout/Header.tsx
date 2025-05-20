import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Header = () => {
  const { pathname } = useLocation();
  const { favorites } = useFavorites();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          color="primary.contrastText"
          sx={{
            flexGrow: 1,
            '&:hover': {
             textDecoration: 'underline',
             color: 'primary.contrastText',
            },
          }}
        >
          Movie Database
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={RouterLink}
            variant='text'
            to="/"
            sx={{
              fontWeight: pathname === '/' ? 'bold' : 'normal',
              color: 'primary.contrastText',
              '&:hover': {
                color: 'primary.contrastText',
              },
            }}
          >
            Search
          </Button>

          <Button
            component={RouterLink}
            variant='text'
            to="/favorites"
            startIcon={
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon />
              </Badge>
            }
            sx={{
              fontWeight: pathname === '/favorites' ? 'bold' : 'normal',
              color: 'primary.contrastText',
              '&:hover': {
                color: 'primary.contrastText',
              },
            }}
          >
            Favorites
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};