import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './features/favorites/contexts/FavoritesContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { SearchPage } from './features/search/SearchPage';
import { MovieDetailPage } from './features/movie/MovieDetailPage';
import { FavoritesPage } from './features/favorites/FavoritesPage';
import { Header } from './components/Header';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          '&:hover': {
            color: 'inherit',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1a1a1a 0%, #2c3e50 100%)',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {import.meta.env.DEV && <ReactQueryDevtools />}
        <BrowserRouter>
          <FavoritesProvider>
            <Header />
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FavoritesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
