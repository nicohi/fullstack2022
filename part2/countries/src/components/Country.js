const Country = ({ country, weather }) => {
  if (!country || !weather) return null
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <b>languages: </b>
      <ul>
        {Object.entries(country.languages).map(l => <li key={l[0]}>{l[1]}</li>)}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width="200"/>
      <h3>Weather in {country.capital}</h3>
      <p>temperature: {weather.main.temp} °C</p>
      <p>description: {weather.weather[0].description}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
           alt={`Weather icon for ${weather.weather[0].description}`} width="150"/>
      <p>wind speed: {weather.wind.speed} m/s</p>
    </>
  )
}

export default Country
