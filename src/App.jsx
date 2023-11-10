import { useState } from "react";
import weatherService from "./services/weather";
import Forecast from "./components/Forecast";

function App() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState("");

  function searchCity(event) {
    event.preventDefault();

    if (query === "") return;

    weatherService
      .citySearch(query)
      .then((data) => {
        if (data.length === 0) {
          setError(
            "No city found using your query. Please enter another city.",
          );
          return;
        }

        setCities(data);
        setCity({});
        setError("");
      })
      .catch((_error) => {
        setError("A problem ocurred. Please try again later.");
      });
  }

  function getForecast(city) {
    weatherService
      .forecastFiveDays(city.Key)
      .then((data) => {
        setForecast(data);
        setCities([]);
        setCity(city);
        setError("");
      })
      .catch((_error) => {
        setCities([]);
        setError("A problem ocurred. Please try again later.");
      });
  }

  return (
    <div className="container mx-auto my-4 flex flex-col gap-4">
      <h1 className="text-4xl text-center">Weather Forecast</h1>
      <div>
        <form onSubmit={searchCity} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="enter city"
            className="border px-2 py-1"
          />
          <button
            type="submit"
            className="border rounded bg-neutral-300 px-2 py-1 hover:bg-neutral-200"
          >
            search
          </button>
        </form>
        <p className="text-red-500">{error}</p>
        <ul className="flex flex-col">
          {cities.map((city) => {
            return (
              <li
                key={city.Key}
                onClick={() => {
                  getForecast(city);
                }}
                className="border p-2 hover:bg-neutral-200"
              >
                <span>{city.EnglishName}, </span>
                <span>{city.AdministrativeArea.EnglishName} </span>
                <span className="text-neutral-500 italic">
                  {city.Country.ID}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <Forecast forecast={forecast} city={city} />
    </div>
  );
}

export default App;
