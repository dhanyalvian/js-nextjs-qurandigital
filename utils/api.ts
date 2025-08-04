//- utils/api.ts

import { QuranConfig } from "./config";

export const getApiUrl = (endpoint: string) => {
  // Ensure the endpoint starts with a slash
  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`;
  }
  
  const apiUrl = QuranConfig.apiUrl;
  const apiVersion = QuranConfig.apiVersion;
  
  // If ApiUrl already ends with a slash, just append the version and endpoint
  if (!apiUrl.endsWith('/')) {
    return `${apiUrl}/${apiVersion}${endpoint}`;
  }
  
  return `${apiUrl}${apiVersion}${endpoint}`;
};
