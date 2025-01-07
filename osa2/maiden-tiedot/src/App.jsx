import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SearchDisplay from './components/SearchDisplay'
import service from './services/service'

const api_key = import.meta.env.VITE_WEATHER_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [weatherCache, setWeatherCache]= useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    service
      .getCountries()
      .then(response => {
        setCountries(response)
      })
  }, [])

  useEffect(() => {
    if(searchResults.length === 1) {
      const country = searchResults[0]
      const inCache = weatherCache.find(item => item.name === country.name.common)

      if(inCache) {
        setWeather(inCache.data)
      } else {
        setWeather(null)
        service
          .getAreaCoordinates(country.capital[0], api_key)
          .then(response => 
            service
            .getWeather(response, api_key)
            .then(response => {
              setWeather(response)
              const cacheObject = { name: country.name.common, data: response } 
              setWeatherCache(weatherCache.concat(cacheObject))
            })
          )
      }
  }
}, [searchResults])

  const handleChange = event => {
    const input = event.target.value
    setSearchTerm(input)
    setSearchResults(countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase())))
  }

  const displayCountry = country => setSearchResults([country])

  return (
    <>
      <SearchBar handleChange={handleChange} searchTerm={searchTerm} />
      <SearchDisplay searchResults={searchResults} weather={weather} handleClick={displayCountry} />
    </>
  )
}

export default App
