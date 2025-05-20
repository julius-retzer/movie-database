import { useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

type SearchInputProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
  initialValue?: string;
  isLoading?: boolean;
};

export const SearchInput = ({
  onSearch,
  placeholder = 'Search for movies...',
  initialValue = '',
  isLoading = false,
}: Omit<SearchInputProps, 'debounceTime'>) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Update internal state when initialValue changes
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleSearch = useCallback(() => {
    onSearch(inputValue.trim());
  }, [inputValue, onSearch]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    onSearch('');
  }, [onSearch]);

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: inputValue && (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClear} size="small" aria-label="clear search">
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
        size="large"
        color="primary"
        onClick={handleSearch}
        disabled={!inputValue.trim() || isLoading}
        startIcon={isLoading ? null : <SearchIcon />}
        sx={{ width: 200 }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Searching...
          </>
        ) : (
          'Search'
        )}
      </Button>
    </Box>
  );
};
