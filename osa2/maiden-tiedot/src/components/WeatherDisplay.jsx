const WeatherDisplay = ({ weather, country }) => {
  if(weather != null && country != []) {
    return (
      <div className="weather-container">
        <h2>Weather in {country.capital[0]} </h2>
        <p>{(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>{weather.wind.speed} m/s</p>
      </div>
    )
  }

  return null
}

export default WeatherDisplay