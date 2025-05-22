import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useFavorites } from '../features/favorites/hooks/useFavorites';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Badge,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  {
    name: 'Favorites',
    path: '/favorites',
    icon: <FavoriteIcon />,
    badge: true,
  },
];

export const Header = () => {
  const { pathname } = useLocation();
  const { favorites } = useFavorites();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        component={RouterLink}
        to="/"
        sx={{
          my: 2,
          color: 'inherit',
          textDecoration: 'none',
          display: 'block',
          '&:hover': {
            color: 'primary.light',
          },
        }}
      >
        Movie Database
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={pathname === item.path}
            >
              <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
                {item.badge ? (
                  <Badge badgeContent={favorites.length} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="static" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MovieIcon sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  my: 2,
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.light',
                  },
                }}
              >
                Movie DB
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  variant="text"
                  color="primary"
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};
