//- utils/api.ts

import { ConfigApiUrl } from "./config"

export const GetApiUrl = (endpoint: string) => {
  let apiUrl = ConfigApiUrl()
  
  // If ApiUrl already ends with a slash, remove it
  if (apiUrl.endsWith("/")) {
    apiUrl = apiUrl.slice(0, -1)
  }
  
  // Ensure the endpoint starts with a slash
  if (!endpoint.startsWith("/")) {
    endpoint = `/${endpoint}`
  }
  
  return `${apiUrl}${endpoint}`
}
