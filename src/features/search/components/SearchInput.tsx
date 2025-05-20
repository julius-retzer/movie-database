import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, InputAdornment, IconButton, Button, Box, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Query is too long'),
});

type SearchFormData = z.infer<typeof searchSchema>;

type SearchInputProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  isLoading?: boolean;
};

export const SearchInput = ({
  onSearch,
  placeholder = 'Search for movies...',
  initialValue = '',
  isLoading = false,
}: SearchInputProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: initialValue,
    },
  });

  const queryValue = watch('query');

  const onSubmit = useCallback(
    (data: SearchFormData) => {
      onSearch(data.query.trim());
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    reset({ query: '' });
    onSearch('');
  }, [onSearch, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2, mb: 3, width: '100%' }}>
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            error={!!errors.query}
            helperText={errors.query?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: field.value && (
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
        )}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="primary"
        disabled={!queryValue?.trim() || isLoading}
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
