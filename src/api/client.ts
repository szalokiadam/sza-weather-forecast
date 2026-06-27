type ApiRequestOptions = RequestInit & {
  queryParams?: Record<string, string>;
};

const createUrl = (path: string, queryParams?: Record<string, string>) => {
  const url = new URL(path, window.location.origin);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
};

export const apiClient = async <ResponseType>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ResponseType> => {
  const { queryParams, headers, ...requestOptions } = options;

  const response = await fetch(createUrl(path, queryParams), {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<ResponseType>;
};
