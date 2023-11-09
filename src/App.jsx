import { useState } from "react";
import weatherService from "./services/weather";
import Forecast from "./components/Forecast";
// import './App.css'

function App() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState({});
  const [forecast, setForecast] = useState({});

  function searchCity(event) {
    event.preventDefault();

    weatherService.citySearch(query).then((data) => {
      setCities(data);
      setCity({});
    });
  }

  function getForecast(city) {
    weatherService.forecastFiveDays(city.Key).then((data) => {
      setForecast(data);
      setCities([]);
      setCity(city);
    });
  }

  return (
    <>
      <div>
        <form onSubmit={searchCity}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="enter city"
          />
          <button type="submit">search</button>
        </form>
      </div>
      <ul>
        {cities.map((city) => {
          return (
            <li key={city.Key}>
              <span>{city.EnglishName}, </span>
              <span>
                {city.AdministrativeArea.EnglishName}{" "}
                {city.AdministrativeArea.EnglishType}{" "}
              </span>
              <span>
                <i>
                  ({city.Region.EnglishName}, {city.Country.EnglishName}){" "}
                </i>
              </span>
              <button onClick={() => getForecast(city)}>
                get five day forecast
              </button>
            </li>
          );
        })}
      </ul>
      <Forecast forecast={forecast} city={city} />
    </>
  );
}

export default App;
