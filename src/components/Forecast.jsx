function Temperature({value, unit}) {
  return (
    <span>{value}° {unit}</span>
  )
}

function Forecast({forecast, city}) {
  if (Object.keys(forecast).length === 0) return null

  return (
    <div>
      <h2>
        <span>{city.EnglishName}, </span>
        <span>{city.AdministrativeArea.EnglishName} {city.AdministrativeArea.EnglishType} </span>
        <span><i>({city.Region.EnglishName}, {city.Country.EnglishName}) </i></span>
      </h2>
      {forecast.DailyForecasts.map(f => {
        return (
          <div key={f.EpochDate} style={{ border: '1px solid black', margin: '1em', padding: '1em'}}>
            <p>Date: {f.Date}</p>
            <p>{f.Day.LongPhrase}</p>
            <p>Temperature: <Temperature value={f.Temperature.Maximum.Value} unit={f.Temperature.Maximum.Unit}/> <Temperature value={f.Temperature.Minimum.Value} unit={f.Temperature.Minimum.Unit}/></p>
            <p>RealFeel®: {f.RealFeelTemperature.Maximum.Phrase} <Temperature value={f.RealFeelTemperature.Maximum.Value} unit={f.RealFeelTemperature.Maximum.Unit}/> <Temperature value={f.RealFeelTemperature.Minimum.Value} unit={f.RealFeelTemperature.Minimum.Unit}/></p>
            <p>Precipitation Probability: {f.Day.PrecipitationProbability}%</p>
            <p>
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Forecast
