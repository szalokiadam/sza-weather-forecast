import type { NextApiRequest, NextApiResponse } from 'next';

type OpenMeteoGeocodingResult = {
  id: number;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

type OpenMeteoGeocodingResponse = {
  results?: OpenMeteoGeocodingResult[];
};

type CitySearchResult = {
  id: string;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

type SearchCitiesResponse = {
  results: CitySearchResult[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchCitiesResponse>
) {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

  if (!search) {
    res.status(400).json({ results: [], message: 'A keresési kifejezés megadása kötelező.' });
    return;
  }

  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.set('name', search);
  url.searchParams.set('count', '20');
  url.searchParams.set('language', 'hu');
  url.searchParams.set('format', 'json');

  const response = await fetch(url);

  if (!response.ok) {
    res.status(response.status).json({ results: [], message: 'A városkeresés sikertelen.' });
    return;
  }

  const data = (await response.json()) as OpenMeteoGeocodingResponse;

  res.status(200).json({
    results:
      data.results?.map((result) => ({
        id: String(result.id),
        name: result.name,
        country: result.country ?? '',
        admin1: result.admin1,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone ?? 'auto',
      })) ?? [],
  });
}
