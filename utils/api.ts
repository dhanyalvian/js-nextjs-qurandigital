//- utils/api.ts

const ApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://equran.id/api';
const ApiVersion = process.env.NEXT_PUBLIC_API_VERSION || 'v2';

export const getApiUrl = (endpoint: string) => {
  // Ensure the endpoint starts with a slash
  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`;
  }
  
  // If ApiUrl already ends with a slash, just append the version and endpoint
  if (!ApiUrl.endsWith('/')) {
    return `${ApiUrl}/${ApiVersion}${endpoint}`;
  }
  
  return `${ApiUrl}${ApiVersion}${endpoint}`;
};
