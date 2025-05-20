import { useState, useEffect, useCallback } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

type SearchInputProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
  initialValue?: string;
};

export const SearchInput = ({
  onSearch,
  placeholder = 'Search for movies...',
  debounceTime = 300,
  initialValue = '',
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);

  // Update internal state when initialValue changes
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Debounce the search callback
  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      onSearch(inputValue);
      setIsTyping(false);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch, debounceTime, isTyping]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsTyping(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearch(inputValue);
        setIsTyping(false);
      }
    },
    [inputValue, onSearch]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    onSearch('');
  }, [onSearch]);

  return (
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
        mb: 3,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: 'background.paper',
        },
      }}
    />
  );
};
