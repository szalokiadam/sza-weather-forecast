import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  Stack,
  TextField,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { CitySearchResult, searchCities } from '@/api/weather';
import { useWeatherContext } from './context';
import { BasicText, colors } from './styles';

const CitySelectorModal: FC = () => {
  const { isCitySelectorOpen, closeCitySelector, loadWeather, selectedCity } = useWeatherContext();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await searchCities(search);
      setResults(response.results);

      if (!response.results.length) {
        setError('Nincs találat erre a városra.');
      }
    } catch {
      setError('Nem sikerült lekérni a városokat.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = async (city: CitySearchResult) => {
    await loadWeather(city);
  };

  return (
    <Dialog
      open={isCitySelectorOpen}
      onClose={selectedCity ? closeCitySelector : undefined}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Város kiválasztása</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ paddingTop: '8px' }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              label="Város neve"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  void handleSearch();
                }
              }}
              sx={{
                flex: '1 1 auto',
              }}
            />
            <Button
              variant="contained"
              sx={{
                flex: '0 0 auto',
                padding: '8px 16px',
              }}
              onClick={() => void handleSearch()}
              disabled={isLoading}
              startIcon={<SearchIcon />}
            >
              Keresés
            </Button>
          </Stack>

          {isLoading && (
            <BasicText
              sx={{
                color: colors.black,
              }}
            >
              Keresés...
            </BasicText>
          )}
          {error && (
            <BasicText
              sx={{
                color: colors.black,
              }}
            >
              {error}
            </BasicText>
          )}

          <List>
            {results.map((result) => (
              <ListItemButton key={result.id} onClick={() => void handleSelectCity(result)}>
                <Stack gap={'4px'}>
                  <BasicText
                    sx={{
                      color: colors.black,
                      fontWeight: 600,
                    }}
                  >
                    {result.name}
                  </BasicText>
                  <BasicText
                    sx={{
                      color: colors.gray,
                    }}
                  >
                    {[result.admin1, result.country].filter(Boolean).join(', ')}
                  </BasicText>
                </Stack>
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CitySelectorModal;
