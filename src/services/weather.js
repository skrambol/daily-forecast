import axios from "axios";

const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY;

function citySearch(query) {
  const url = new URL(
    "http://dataservice.accuweather.com/locations/v1/cities/search",
  );
  url.searchParams.append("q", query);
  url.searchParams.append("apikey", API_KEY);

  const request = axios.get(url.toString());
  return request.then((response) => response.data);
}

function forecastFiveDays(locationKey) {
  const url = new URL(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
  );
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("metric", true);
  url.searchParams.append("details", true);

  const request = axios.get(url.toString());
  return request.then((response) => response.data);
}

export default {
  citySearch,
  forecastFiveDays,
};
