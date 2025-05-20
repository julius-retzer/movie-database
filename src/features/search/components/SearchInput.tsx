import { useCallback } from 'react';
import { TextField, InputAdornment, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
};

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search for movies...',
  error,
  isLoading = false,
}: SearchInputProps) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch();
      }
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={handleClear}
                size="small"
                aria-label="clear search"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        disabled={!value.trim() || isLoading}
        startIcon={<SearchIcon />}
        sx={{ width: 200 }}
        loading={isLoading}
      >
        Search
      </Button>
    </Box>
  );
};
