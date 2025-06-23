// API configuration for development and production
const API_BASE_URL = import.meta.env.DEV
  ? "/api" // Use proxy in development
  : "https://api.codetabs.com/v1/proxy/?quest=https://serpapi.com"; // Use direct URL in production

const API_KEY =
  import.meta.env.VITE_SERPAPI_KEY ||
  "963db332d651c2c25dfa85a450f22fb1c92fd64dff10253de07e5e382a6b0587";

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const getSearchUrl = (searchQuery) => {
  const url = getApiUrl(
    `/search.json?engine=youtube&search_query=${encodeURIComponent(
      searchQuery
    )}&api_key=${API_KEY}`
  );
  return url;
};

// Helper function to make API calls with proper error handling
export const makeApiCall = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_BASE_URL;
