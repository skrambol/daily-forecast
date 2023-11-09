function TemperatureHighLow({ valueHigh, valueLow, unit }) {
  return (
    <span className="inline-flex flex-row items-center gap-4">
      <span>
        {valueHigh}° {unit} (High);
      </span>
      <span>
        {valueLow}° {unit} (Low)
      </span>
    </span>
  );
}

function DailyForecast({ forecast }) {
  return (
    <div
      key={forecast.EpochDate}
      className="container mx-auto flex flex-col gap-4 border p-4"
    >
      <p className="font-bold">
        {new Date(forecast.Date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="italic text-xl">{forecast.Day.ShortPhrase}</p>
      <p>
        Temperature:{" "}
        <TemperatureHighLow
          valueHigh={forecast.Temperature.Maximum.Value}
          valueLow={forecast.Temperature.Minimum.Value}
          unit={forecast.Temperature.Maximum.Unit}
        />
      </p>
      <p>
        RealFeel®:{" "}
        <TemperatureHighLow
          valueHigh={forecast.RealFeelTemperature.Maximum.Value}
          valueLow={forecast.RealFeelTemperature.Minimum.Value}
          unit={forecast.RealFeelTemperature.Maximum.Unit}
        />
      </p>
      <p>Precipitation Probability: {forecast.Day.PrecipitationProbability}%</p>
      <p></p>
    </div>
  );
}

function Forecast({ forecast, city }) {
  if (Object.keys(forecast).length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>
          <p className="text-3xl">
            {city.EnglishName}, {city.AdministrativeArea.EnglishName}
          </p>
          <p className="italic text-xl">{city.Country.EnglishName}</p>
        </h2>
      </div>
      <div className="grid grid-rows-5 grid-cols-1 lg:grid-rows-1 lg:grid-cols-5 gap-2">
        {forecast.DailyForecasts.map((forecast) => (
          <DailyForecast key={forecast.EpochDate} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}

export default Forecast;
