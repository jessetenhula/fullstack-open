import WeatherDisplay from "./WeatherDisplay"

const CountryDisplay = ({ country, weather }) => {
  return (
    <div className="country-container">
      <h1>{country.name.common}</h1>
      <ul>
        <li>capital: {country.capital[0]}</li>
        <li>area: {country.area}</li>
      </ul>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <div className="country-flag">{country.flag}</div>
      <WeatherDisplay country={country} weather={weather} />
    </div>
  )
}

export default CountryDisplay