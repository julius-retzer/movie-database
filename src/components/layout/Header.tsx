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
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        >
          Movie Database
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: pathname === '/' ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Search
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/favorites"
            startIcon={
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon />
              </Badge>
            }
            sx={{
              fontWeight: pathname === '/favorites' ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
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